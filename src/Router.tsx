import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";

import { MODE } from "@/config";
import Home from "@/pages/dashboard/Home.tsx";
import Components from "@/pages/dev/Components.tsx";
import Login from "@/pages/login/Login.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard">
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        {MODE === "development" && (
          <Route path="dev/components" element={<Components />} />
        )}
      </Routes>
    </HashRouter>
  </StrictMode>,
);
