import { confirmPasswordReset } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { UpdatePassword } from "@/schemas/datos-personales";

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [redirectTimer]);

  async function onSubmit(values: UpdatePassword) {
    await confirmPasswordReset(
      auth,
      searchParams.get("oobCode") || "",
      values.password,
    );
    toast.success("Contraseña actualizada correctamente");
    setRedirectTimer(setTimeout(() => navigate("/"), 3000));
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Restablecer Contraseña</h1>

      <UpdatePasswordForm onSubmit={onSubmit} />

      <div className="mb-4 text-center">
        <Button variant="link" className="text-xs">
          <Link to="..">Volver a inicio de sesión</Link>
        </Button>
      </div>
    </div>
  );
}
