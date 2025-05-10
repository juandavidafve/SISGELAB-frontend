import { Navigate, useSearchParams } from "react-router";

import PasswordReset from "./components/PasswordReset";

export default function Action() {
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  if (mode === "resetPassword") return <PasswordReset />;

  return <Navigate to=".." />;
}
