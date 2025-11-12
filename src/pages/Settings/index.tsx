import { useEffect } from "react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { SettingsForm } from "../../components/SettingsForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function Settings() {
  useEffect(() => {
    document.title = "Entenda a Técnica Pomodoro - Chronos Pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Página de configurações dos tempos dos ciclos de foco, descanso curto
          e longo
        </p>
      </Container>

      <Container>
        <SettingsForm />
      </Container>
    </MainTemplate>
  );
}
