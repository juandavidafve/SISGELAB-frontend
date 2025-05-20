import { Icon } from "@iconify/react/dist/iconify.js";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";
import { create as createDatosPersonales } from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const { refreshInfo, auth, info } = useAuth();

  async function onCreate(datosPersonales: DatosPersonalesFormOutput) {
    await createDatosPersonales(datosPersonales);

    toast.success("Datos actualizados correctamente");
    refreshInfo();
    navigate("/dashboard");
  }

  if (info?.hasPersonalData) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Button
        className="absolute top-6 right-6 shadow"
        size="icon"
        variant="secondary"
        onClick={() => auth.signOut()}
      >
        <Icon icon="material-symbols:logout-rounded" className="size-6" />
        <span className="sr-only">Cerrar sesión</span>
      </Button>
      <h1 className="mb-4 text-2xl font-bold">
        Necesitamos más información sobre tí
      </h1>

      <DatosPersonalesForm onSubmit={onCreate} />
    </div>
  );
}
