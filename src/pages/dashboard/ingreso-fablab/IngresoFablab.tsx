import { Icon } from "@iconify/react/dist/iconify.js";

import QrDialog from "@/components/QrDialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

import IngresoFablabDataTable from "./components/IngresoFablabDataTable";
import IngresoFablabForm from "./components/IngresoFablabForm";

export default function IngresoFablab() {
  const { info } = useAuth();
  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingreso al FabLab</h1>
        {info?.roles.includes("ROLE_ADMINISTRADOR") && (
          <QrDialog url={`${window.location.href}`}>
            <Button variant="ghost" size="icon">
              <Icon icon="material-symbols:share-outline" className="size-6" />
            </Button>
          </QrDialog>
        )}
      </div>

      {info?.roles.includes("ROLE_PARTICIPANTE") && <IngresoFablabForm />}

      {info?.roles.includes("ROLE_ADMINISTRADOR") && <IngresoFablabDataTable />}
    </div>
  );
}
