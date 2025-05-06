import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";

import { MODE } from "@/config";
import CardLayout from "@/layouts/CardLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/dashboard/Home.tsx";
import Components from "@/pages/dev/Components.tsx";
import Login from "@/pages/login/Login";
import PasswordRecovery from "@/pages/login/PasswordRecovery";
import PasswordReset from "@/pages/login/PasswordReset";

import "./index.css";
import FabLabIngresoTable from "./pages/ingreso-fablab/IngresoFablab";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<CardLayout />}>
          <Route index element={<Login />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
        {MODE === "development" && (
          <Route path="dev/components" element={<Components />} />
        )}

        <Route path="ingreso-fablab" element={<FabLabIngresoTable />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
