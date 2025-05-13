import { toast } from "sonner";

import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";
import { create as createDatosPersonales } from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function NuevoUsuario() {
  async function onCreate(datosPersonales: DatosPersonalesFormOutput) {
    await createDatosPersonales(datosPersonales);

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
