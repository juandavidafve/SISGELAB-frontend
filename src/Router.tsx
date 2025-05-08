import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";

import ProtectedRoute from "@/components/ProtectedRoute";
import CardLayout from "@/layouts/CardLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MODE } from "@/lib/config";
import Home from "@/pages/dashboard/Home.tsx";
import Components from "@/pages/dev/Components.tsx";
import Login from "@/pages/login/Login";
import PasswordRecovery from "@/pages/login/PasswordRecovery";
import PasswordReset from "@/pages/login/PasswordReset";

import "./index.css";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>

        <Route
          path="login"
          element={
            <ProtectedRoute
              elemOnDeny={<CardLayout />}
              elemOnAllow={<Navigate to="/dashboard" />}
            />
          }
        >
          <Route index element={<Login />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>

        {MODE === "development" && (
          <Route path="dev/components" element={<Components />} />
        )}
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
