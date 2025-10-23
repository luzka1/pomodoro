import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

import type { TaskModel } from "../../models/TaskModel";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { Tips } from "../Tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name;

  const taskInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskInput) return;

    const taskName = taskInput.current?.value.trim();

    if (!taskName) {
      alert("Digite o nome da sua tarefa!");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      type: nextCycleType,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form className="form" onSubmit={handleSubmitForm} action="">
      <div className="formRow">
        <DefaultInput
          id="MainInput"
          labelText="task"
          placeholder="Digite algo"
          type="text"
          ref={taskInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      <div className="formRow">{state.currentCycle > 0 && <Cycles />}</div>

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            key="NewTask_Button"
            icon={<PlayCircleIcon />}
            color="green"
            type="submit"
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            key="Interrupt_Button"
            icon={<StopCircleIcon />}
            color="red"
            type="button"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
