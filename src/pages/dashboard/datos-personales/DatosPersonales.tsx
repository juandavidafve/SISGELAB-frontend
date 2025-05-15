import { toast } from "sonner";

import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import {
  convertToFormInput as convertDatosPersonalesToFormInput,
  DatosPersonalesFormOutput,
} from "@/schemas/datos-personales";
import {
  get as getDatosPersonales,
  update as updateDatosPersonales,
} from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";

export default function DatosPersonales() {
  const { result: datosPersonales, execute: refreshDatosPersonales } =
    useAsyncWithToken(getDatosPersonales, []);

  async function handleUpdate(datosPersonales: DatosPersonalesFormOutput) {
    await updateDatosPersonales(datosPersonales);

    toast.success("Datos actualizados correctamente");
    refreshDatosPersonales();
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Datos personales</h1>
      </div>

      <DatosPersonalesForm
        onSubmit={handleUpdate}
        defaultValues={
          datosPersonales && convertDatosPersonalesToFormInput(datosPersonales)
        }
      />
    </>
  );
}
