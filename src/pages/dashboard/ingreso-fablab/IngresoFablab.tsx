import QrDialog from "@/components/QrDialog";
import { Button } from "@/components/ui/button";

import IngresoFablabDataTable from "./components/IngresoFablabDataTable";
import IngresoFablabForm from "./components/IngresoFablabForm";

export default function IngresoFablab() {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingreso al FabLab</h1>
        <QrDialog url="https://www.google.com">
          <Button>Ver enlace de Ingreso</Button>
        </QrDialog>
      </div>

      <IngresoFablabForm />

      <IngresoFablabDataTable />
    </div>
  );
}
