import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";

import ProtectedRoute from "@/components/ProtectedRoute";
import CardLayout from "@/layouts/CardLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MODE } from "@/lib/config";
import Action from "@/pages/auth/Action";
import Login from "@/pages/auth/Login";
import PasswordRecovery from "@/pages/auth/PasswordRecovery";
import Home from "@/pages/dashboard/Home.tsx";
import IngresoFablab from "@/pages/dashboard/ingreso-fablab/IngresoFablab";
import OfertaFormacion from "@/pages/dashboard/oferta-formacion/OfertaFormacion";
import OfertaFormacionDetails from "@/pages/dashboard/oferta-formacion/OfertaFormacionDetails";
import Components from "@/pages/dev/Components.tsx";

import "./index.css";
import DatosPersonales from "./pages/dashboard/datos-personales/DatosPersonales";
import NuevoUsuario from "./pages/dashboard/datos-personales/NuevoUsuario";

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
          <Route path="ingreso-fablab" element={<IngresoFablab />} />
          <Route path="oferta-formacion" element={<OfertaFormacion />} />
          <Route
            path="oferta-formacion/:id"
            element={<OfertaFormacionDetails />}
          />
          <Route path="datos-personales" element={<DatosPersonales />} />
        </Route>

        <Route
          path="dashboard/datos-personales/nuevo-usuario"
          element={
            <ProtectedRoute>
              <CardLayout allowHorizontal={false} />
            </ProtectedRoute>
          }
        >
          <Route index element={<NuevoUsuario />} />
        </Route>

        <Route
          path="auth"
          element={
            <ProtectedRoute
              elemOnDeny={<CardLayout />}
              elemOnAllow={<Navigate to="/dashboard" />}
            />
          }
        >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="action" element={<Action />} />
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
