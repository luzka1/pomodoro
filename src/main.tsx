import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/globals.css";
import "./styles/theme.css";

import App from "./App.tsx";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </StrictMode>
);
