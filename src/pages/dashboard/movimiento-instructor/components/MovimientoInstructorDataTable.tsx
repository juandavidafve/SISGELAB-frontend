import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";
import { InstructorMinimalSchema } from "@/schemas/instructor";
import { MovimientoInstructor } from "@/schemas/movimiento-instructor";
import { remove as deleteMovimiento } from "@/services/movimiento-instructor";

import { MovimientoDeleteAlert } from "./MovimientoDeleteAlert";

interface Props {
  loading: boolean;
  refresh: () => void;
  movimientos: MovimientoInstructor[];
}

export default function MovimientoInstructorDataTable({
  movimientos,
  loading,
  refresh,
}: Props) {
  const [selectedMovimiento, setSelectedMovimiento] =
    useState<MovimientoInstructor>();

  const [deleteMovimientoDialog, setDeleteMovimientoDialog] = useState(false);

  const columns: ColumnDef<MovimientoInstructor>[] = [
    {
      id: "spacing",
      enableHiding: false,
    },
    {
      accessorKey: "fecha",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha" />
      ),
      cell: ({ getValue }) => {
        const { data, error } = z.date().safeParse(getValue());
        if (error) return;
        return format(data, "PPP hh:mm a", { locale: es });
      },
    },
    {
      accessorKey: "instructor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instructor" />
      ),
      cell: ({ getValue }) => {
        const { data, error } = InstructorMinimalSchema.safeParse(getValue());
        if (error) return;
        return data.nombre;
      },
    },
    {
      accessorKey: "tipo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tipo de movimiento" />
      ),
      cell: ({ getValue }) => {
        const { data, error } = z
          .enum(["ENTRADA", "SALIDA"])
          .safeParse(getValue());
        if (error) return;

        if (data === "ENTRADA") return "Entrada";
        if (data === "SALIDA") return "Salida";
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const movimiento = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <Icon icon="material-symbols:more-horiz" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setDeleteMovimientoDialog(true);
                  setSelectedMovimiento(movimiento);
                }}
              >
                Borrar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function handleDelete() {
    if (!selectedMovimiento) return;
    await deleteMovimiento(selectedMovimiento.id);
    toast.success("Movimiento eliminado");
    setDeleteMovimientoDialog(false);
    await refresh();
  }

  if (loading)
    return (
      <div className="my-5 flex justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <DataTable columns={columns} data={movimientos || []} />

      <MovimientoDeleteAlert
        open={deleteMovimientoDialog}
        setOpen={setDeleteMovimientoDialog}
        onAccept={handleDelete}
        movimiento={selectedMovimiento}
      />
    </>
  );
}
