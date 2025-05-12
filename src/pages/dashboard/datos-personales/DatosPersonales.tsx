import { toast } from "sonner";

import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";
import { create as createDatosPersonales } from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function DatosPersonales() {
  async function onCreate(datosPersonales: DatosPersonalesFormOutput) {
    //await createDatosPersonales(datosPersonales);
    console.log(datosPersonales);
    toast.success("Datos personales actualizados correctamente");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Datos personales</h1>

      <DatosPersonalesForm onSubmit={onCreate} />
    </>
  );
}
