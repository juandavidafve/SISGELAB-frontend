import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/providers/AuthProvider";

import Router from "./Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
