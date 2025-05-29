import { format } from "date-fns";
import { useState } from "react";

import { downloadFile } from "@/lib/utils";
import { Reporte } from "@/schemas/reporte";
import { get as getReporte } from "@/services/reporte";

import ReporteDataTable from "./components/ReporteDataTable";
import ReporteSelector from "./components/ReporteSelector";

export default function Reportes() {
  const [reporte, setReporte] = useState<Reporte>();
  const [selectedPlantilla, setSelectedPlantilla] = useState<string>();

  async function getReporteByPlantilla(plantilla: string) {
    setReporte(undefined);
    setReporte(await getReporte(plantilla));
    setSelectedPlantilla(plantilla);
  }

  async function download() {
    await downloadFile(
      `/reportes/excel/?plantilla=${selectedPlantilla}`,
      `${selectedPlantilla?.replace("PLANTILLA", "REPORTE")}_${format(new Date(), "dd-MM-yyyy")}.xlsx`,
    );
  }

  return (
    <>
      <h1 className="my-10 text-2xl font-bold">Reportes</h1>
      <ReporteSelector onSubmit={getReporteByPlantilla} />
      {reporte && <ReporteDataTable reporte={reporte} onDownload={download} />}
    </>
  );
}
