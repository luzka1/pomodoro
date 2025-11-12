import { SaveIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function SettingsForm() {
  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Digite um número em TODOS os campos");
    }

    if (workTime < 1 || workTime > 60) {
      formErrors.push("Escolha um tempo entre 1 e 60 minutos para foco");
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        "Escolha um tempo entre 1 e 30 minutos para descanso curto"
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push(
        "Escolha um tempo entre 1 e 60 minutos para descanso longo"
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach((errors) => {
        showMessage.error(errors);
      });

      return;
    }

    const newTimeSettings = {
      workTime,
      shortBreakTime,
      longBreakTime,
    };

    showMessage.success("Configurações salvas com sucesso!");

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: newTimeSettings,
    });
  }

  return (
    <form className="form" onSubmit={(e) => handleSaveSettings(e)} action="">
      <div className="formRow">
        <DefaultInput
          id="workTime"
          labelText="Foco"
          type="text"
          ref={workTimeInput}
          defaultValue={state.config.workTime}
        />
      </div>

      <div className="formRow">
        <DefaultInput
          id="shortBreakTime"
          labelText="Descanso curto"
          type="text"
          ref={shortBreakTimeInput}
          defaultValue={state.config.shortBreakTime}
        />
      </div>

      <div className="formRow">
        <DefaultInput
          id="longBreakTime"
          labelText="Descanso longo"
          type="text"
          ref={longBreakTimeInput}
          defaultValue={state.config.longBreakTime}
        />
      </div>

      <div className="formRow">
        <DefaultButton
          icon={<SaveIcon />}
          aria-label="Salvar configurações"
          title="Salvar configurações"
        />
      </div>
    </form>
  );
}
