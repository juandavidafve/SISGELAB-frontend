import "react";
import { useParams } from "react-router";

import { KeyValueItem } from "@/components/KeyValueItem";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { formatDate } from "@/lib/utils";
import { getById as getSesionById } from "@/services/sesion";

import Asistencias from "./components/Asistencias";
import Evidencias from "./components/Evidencias";

export default function Sesion() {
  const { id } = useParams();
  const idNum = parseInt(String(id));

  const {
    result: sesion,
    loading: sesionLoading,
    execute: refreshSesion,
  } = useAsyncWithToken(getSesionById, [idNum]);

  if (sesionLoading)
    return <Loader className="absolute top-1/2 left-1/2 -translate-1/2" />;

  if (!sesion) return;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-bold">{sesion.nombre}</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <KeyValueItem
          icon="material-symbols:calendar-month-outline-rounded"
          label="Fecha"
          values={formatDate(sesion.fecha, "dd/MM/yyyy")}
        />

        <div className="flex gap-4">
          <KeyValueItem
            icon="material-symbols:schedule-outline"
            label="Inicio"
            values={sesion.inicio}
          />
          <KeyValueItem label="Fin" values={sesion.fin} />
        </div>

        <KeyValueItem
          icon="material-symbols:meeting-room-outline-rounded"
          label="Sala"
          values={sesion.sala.nombre}
        />

        <KeyValueItem
          icon="material-symbols:school-outline-rounded"
          label="Instructores"
          values={sesion.instructores.map((i) => i.nombre)}
        />
      </div>

      <Asistencias sesion={sesion} />

      <Evidencias sesion={sesion} refresh={() => refreshSesion(idNum)} />
    </>
  );
}
