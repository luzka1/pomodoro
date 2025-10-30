import { BrowserRouter, Route, Routes } from "react-router";
import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { HomePage } from "./pages/Home";
import { AboutPomodoroPage } from "./pages/AboutPomodoro";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <>
      <TaskContextProvider>
        <MessagesContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-pomodoro" element={<AboutPomodoroPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}

export default App;
