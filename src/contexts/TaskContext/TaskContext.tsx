import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionsModel } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.ActionDispatch<[action: TaskActionsModel]>;
};

const initialState = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialState);
