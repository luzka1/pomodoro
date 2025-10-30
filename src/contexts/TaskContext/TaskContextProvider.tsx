import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { TaskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskProviderProps) {
  const loadBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");

    if (!storageState) return initialTaskState;

    const parsedState = JSON.parse(storageState);

    return {
      ...parsedState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (loadBeepRef.current) {
        loadBeepRef.current === loadBeep();
        loadBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });

      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [state]);

  useEffect(() => {
    if (state.activeTask && loadBeepRef.current === null) {
      loadBeepRef.current = loadBeep();
    } else {
      loadBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
