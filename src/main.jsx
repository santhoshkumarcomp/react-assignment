import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./DnDContext.jsx";

createRoot(document.getElementById("root")).render(
  <ReactFlowProvider>
    <DnDProvider>
    <App />
    </DnDProvider>
  </ReactFlowProvider>
);
