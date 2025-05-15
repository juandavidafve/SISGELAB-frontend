import useAuth from "@/hooks/useAuth";

import IngresoFablabDataTable from "./components/IngresoFablabDataTable";
import IngresoFablabForm from "./components/IngresoFablabForm";

export default function IngresoFablab() {
  const { info } = useAuth();
  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingreso al FabLab</h1>
      </div>

      {info?.roles.includes("ROLE_PARTICIPANTE") && <IngresoFablabForm />}

      {info?.roles.includes("ROLE_ADMINISTRADOR") && <IngresoFablabDataTable />}
    </div>
  );
}
