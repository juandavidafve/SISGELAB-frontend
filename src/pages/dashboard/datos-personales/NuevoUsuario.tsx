import { toast } from "sonner";

import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";
import { update as updateDatosPersonales } from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function NuevoUsuario() {
  async function onCreate(datosPersonales: DatosPersonalesFormOutput) {
    await updateDatosPersonales(datosPersonales);

    toast.success("Datos actualizados correctamente");
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
