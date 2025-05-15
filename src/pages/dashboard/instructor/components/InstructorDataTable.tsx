import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

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
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { InstructorFormOutput, InstructorMinimal } from "@/schemas/instructor";
import { getAll as getInstructores } from "@/services/instructor";

import { InstructorDeleteAlert } from "./InstructorDeleteAlert";
import { InstructorDialog } from "./InstructorDialog";

export default function InstructorDataTable() {
  const { result: instructores } = useAsyncWithToken(getInstructores, []);
  const [selectedInstructor, setSelectedInstructor] =
    useState<NonNullable<typeof instructores>[number]>();
  const [deleteInstructor, setDeleteInstructor] = useState(false);
  const [editInstructor, setEditInstructor] = useState(false);

  const columns: ColumnDef<InstructorMinimal>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
    },
    {
      accessorKey: "correo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Correo" />
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const instructor = row.original;

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
                  setEditInstructor(true);
                  setSelectedInstructor(instructor);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteInstructor(true);
                  setSelectedInstructor(instructor);
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

  function handleDelete() {
    console.log("Borrar", selectedInstructor);
  }

  function handleEdit(instructor: InstructorFormOutput) {
    console.log(instructor);
  }

  return (
    <>
      <DataTable columns={columns} data={instructores || []} />

      <InstructorDeleteAlert
        open={deleteInstructor}
        setOpen={setDeleteInstructor}
        onAccept={handleDelete}
        instructor={selectedInstructor}
      />

      <InstructorDialog
        onSubmit={handleEdit}
        open={editInstructor}
        setOpen={setEditInstructor}
        variant="EDIT"
        instructor={selectedInstructor}
      />
    </>
  );
}
