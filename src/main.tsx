import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Index } from "./Index";
import { App } from "./App";
import { Products } from "./Products";
import { Suporte } from "./Suporte";
import { Config } from "./Config";
import { Login } from "./Login";
import { SessaoProvider } from "./contexts/SessaoContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessaoProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/caixa" element={<App />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/relatorios" element={<Index />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/configuracoes" element={<Config />} />
        </Routes>
      </HashRouter>
    </SessaoProvider>
  </React.StrictMode>,
);
