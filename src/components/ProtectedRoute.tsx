import { ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router";

import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children?: ReactNode;
  elemOnDeny?: ReactNode;
  elemOnAllow?: ReactNode;
  elemOnRedirect?: ReactNode;
}

export default function ProtectedRoute({
  children,
  elemOnDeny,
  elemOnAllow,
  elemOnRedirect,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  if (user === undefined) return;
  if (elemOnRedirect !== undefined && searchParams.get("redirectTo"))
    return elemOnRedirect;
  if (user === null) return elemOnDeny || <Navigate to="/auth/login" />;
  return elemOnAllow || children;
}
