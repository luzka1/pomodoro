import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const whenActiveTask = {
    workTime: (
      <span>
        Agora foque por <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Agora descanse por <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: (
      <span>
        Agora tire um belo <b>descanso longo</b>
      </span>
    ),
  };

  const whenDontHaveActiveTask = {
    workTime: (
      <span>
        O próximo ciclo será de <b>foco</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        O próximo ciclo será de <b>descanso curto</b>
      </span>
    ),
    longBreakTime: (
      <span>
        O próximo ciclo será de <b>descanso longo</b>
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && whenActiveTask[state.activeTask.type]}
      {!state.activeTask && whenDontHaveActiveTask[nextCycleType]}
    </>
  );
}
