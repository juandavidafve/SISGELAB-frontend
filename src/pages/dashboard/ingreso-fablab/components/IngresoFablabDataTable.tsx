import { ColumnDef } from "@tanstack/react-table";

import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { IngresoFablab, motivosMap } from "@/schemas/ingreso-fablab";
import { getAll as getIngresos } from "@/services/ingreso-fablab";

const columns: ColumnDef<IngresoFablab>[] = [
  {
    accessorKey: "tiempo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha y hora" />
    ),
    cell: ({ cell }) => {
      return cell.getValue()?.toLocaleString();
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "motivo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Motivo" />
    ),
    cell: ({ cell }) => {
      return motivosMap.get(cell.getValue() as IngresoFablab["motivo"]);
    },
  },
];

export default function IngresoFablabDataTable() {
  const { result: ingresos, loading: loadingIngresos } = useAsyncWithToken(
    getIngresos,
    [],
  );

  if (loadingIngresos)
    return (
      <div className="my-5 flex justify-center">
        <Loader />
      </div>
    );

  return <DataTable columns={columns} data={ingresos || []} />;
}
