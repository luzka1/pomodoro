import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleDots = Array.from({ length: state.currentCycle });

  const tasksType = {
    shortBreakTime: "descanso curto",
    longBreakTime: "descanso longo",
    workTime: "foco",
  };

  return (
    <div className={styles.container}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleDots.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              aria-label={`Ciclo de ${tasksType[nextCycleType]}`}
              title={`Ciclo de ${tasksType[nextCycleType]}`}
              key={`Task_${nextCycleType}_${index}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            />
          );
        })}
      </div>
    </div>
  );
}
