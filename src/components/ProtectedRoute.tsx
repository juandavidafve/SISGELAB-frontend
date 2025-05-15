import { ReactNode } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router";

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
  const { user, hasPersonalData } = useAuth();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const newUserForm = "/dashboard/datos-personales/nuevo-usuario";
  if (user === undefined) return;
  //if (hasPersonalData === false && pathname !== newUserForm)
  //  return <Navigate to={newUserForm} />;
  if (elemOnRedirect !== undefined && searchParams.get("redirectTo"))
    return elemOnRedirect;
  if (user === null) return elemOnDeny || <Navigate to="/auth/login" />;
  return elemOnAllow || children;
}
