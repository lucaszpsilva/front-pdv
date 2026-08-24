// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Index } from "./Index";
import { App } from "./App";
import { Products } from "./Products";
import { Suporte } from "./Suporte";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Menu principal */}
        <Route path="/caixa" element={<App />} /> {/* Tela do Caixa */}
        <Route path="/produtos" element={<Products />} />{" "}
        {/* Tela dos Produtos */}
        <Route path="/relatorios" element={<Index />} />{" "}
        {/* Tela dos Relatorios */}
        <Route path="/suporte" element={<Suporte />} /> {/* Tela de Suporte */}
        <Route path="/configuracoes" element={<Index />} />{" "}
        {/* Tela dos Configurações */}
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
