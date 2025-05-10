import EntryTable from "./components/EntryTable";
import QrDialog from "./components/QrDialog";
import TablaIngresos from "./components/tabla-ingresos";

export default function Entry() {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingreso al FabLab</h1>
        <QrDialog url="https://www.google.com" />
      </div>

      <TablaIngresos apiUrl={""} />
    </div>
  );
}
