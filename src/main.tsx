import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Index } from "./Index";
import { App } from "./App";
import { Caixa } from "./Caixa";
import { Products } from "./Products";
import { Suporte } from "./Suporte";
import { Config } from "./Config";
import { Login } from "./Login";
import { SessaoProvider } from "./contexts/SessaoContext";
import { RotaProtegida } from "./components/RotaProtegida";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessaoProvider>
      <HashRouter>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <RotaProtegida>
                <Index />
              </RotaProtegida>
            }
          />
          <Route
            path="/caixa"
            element={
              <RotaProtegida>
                <App />
              </RotaProtegida>
            }
          />
          <Route
            path="/caixa-admin"
            element={
              <RotaProtegida>
                <Caixa />
              </RotaProtegida>
            }
          />

          <Route
            path="/produtos"
            element={
              <RotaProtegida>
                <Products />
              </RotaProtegida>
            }
          />
          <Route
            path="/suporte"
            element={
              <RotaProtegida>
                <Suporte />
              </RotaProtegida>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <RotaProtegida>
                <Config />
              </RotaProtegida>
            }
          />

          {/* Se digitar qualquer rota doida, volta pro início */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </SessaoProvider>
  </React.StrictMode>,
);
