import { useState } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";

import styles from './styles.module.css';

export function HistoryTable() {
  const { state } = useTaskContext();

  const [sortedTasksOptions, setSortedTasksOptions] =
    useState<SortTasksOptions>(() => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        direction: "asc",
        field: "startDate",
      };
    });

  function handleSortTaskOptions({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection =
      sortedTasksOptions.direction === "asc" ? "desc" : "asc";

    setSortedTasksOptions({
      tasks: sortTasks({
        tasks: sortedTasksOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  const taskTypeFormattedNames = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
  };

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.thClass} onClick={() => handleSortTaskOptions({ field: "name" })}>
            Tarefa &#8597;
          </th>
          <th className={styles.thClass} onClick={() => handleSortTaskOptions({ field: "duration" })}>
            Duração &#8597;
          </th>
          <th className={styles.thClass} onClick={() => handleSortTaskOptions({ field: "startDate" })}>
            Data &#8597;
          </th>
          <th>Status</th>
          <th>Tipo</th>
        </tr>
      </thead>

      <tbody>
        {sortedTasksOptions.tasks.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.duration}min</td>
              <td>{formatDate(item.startDate)}</td>
              <td>{getTaskStatus(item, state.activeTask)}</td>
              <td>{taskTypeFormattedNames[item.type]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
