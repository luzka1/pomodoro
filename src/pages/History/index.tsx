import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { HistoryTable } from "../../components/HistoryTable";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();

  const hasTasks = state.tasks.length > 0;

  function handleResetHistory() {
    if (!confirm("Tem certeza que deseja apagar o histórico?")) return;

    dispatch({ type: TaskActionTypes.RESET_TASK });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                aria-label="Apagar o histórico"
                title="Apagar o histórico"
                type="button"
                color="red"
                onClick={handleResetHistory}
                icon={<TrashIcon />}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          {hasTasks ? (
            <HistoryTable />
          ) : (
            <div className={styles.noTask}>
              <p>Não há tarefas no histórico.</p>
            </div>
          )}
        </div>
      </Container>
    </MainTemplate>
  );
}
