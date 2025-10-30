import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";

export function HistoryTable() {
  const { state } = useTaskContext();

  const taskTypeFormattedNames = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Duração</th>
          <th>Data</th>
          <th>Status</th>
          <th>Tipo</th>
        </tr>
      </thead>

      <tbody>
        {state.tasks.map((item) => {
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
