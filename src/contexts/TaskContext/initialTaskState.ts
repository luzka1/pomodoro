import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  activeTask: null,
  currentCycle: 0,
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  config: {
    workTime: 25,
    longBreakTime: 15,
    shortBreakTime: 5,
  },
};
