import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { MainRouter } from "./routers/MainRouter";

function App() {
  return (
    <>
      <TaskContextProvider>
        <MainRouter />
      </TaskContextProvider>
    </>
  );
}

export default App;
