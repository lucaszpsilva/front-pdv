// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Index } from "./Index";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Menu principal */}
        <Route path="/caixa" element={<App />} /> {/* Tela do Caixa */}
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
