import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import useAuth from "@/hooks/useAuth";
import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";
import { create as createDatosPersonales } from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const { refreshInfo } = useAuth();

  useEffect(() => {
    refreshInfo();
  }, []);

  async function onCreate(datosPersonales: DatosPersonalesFormOutput) {
    await createDatosPersonales(datosPersonales);

    toast.success("Datos actualizados correctamente");
    refreshInfo();
    navigate("/dashboard");
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Necesitamos más información sobre tí
      </h1>

      <DatosPersonalesForm onSubmit={onCreate} />
    </div>
  );
}
