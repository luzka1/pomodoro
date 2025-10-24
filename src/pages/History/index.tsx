import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { HistoryTable } from "../../components/HistoryTable";

export function History() {
  const { state } = useTaskContext();

  console.log(state)

  function removeHistory() {
    localStorage.removeItem("state");
    window.location.reload();
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              aria-label="Apagar o histórico"
              title="Apagar o histórico"
              type="button"
              color="red"
              onClick={removeHistory}
              icon={<TrashIcon />}
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          {state.tasks.length > 0 ? (
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
