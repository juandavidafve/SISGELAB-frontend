import { ReactNode } from "react";
import { Navigate } from "react-router";

import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children?: ReactNode;
  elemOnDeny?: ReactNode;
  elemOnAllow?: ReactNode;
}

export default function ProtectedRoute({
  children,
  elemOnDeny,
  elemOnAllow,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  if (user === undefined) return;
  if (user === null) return elemOnDeny || <Navigate to="/auth/login" />;
  return elemOnAllow || children;
}
