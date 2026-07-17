import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { installChunkLoadRecovery } from "./chunkLoadRecovery";
import { installFocusModality } from "./focusModality";
import "./styles.css";

installChunkLoadRecovery();
installFocusModality();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
