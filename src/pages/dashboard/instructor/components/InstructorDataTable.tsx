import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

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
import { InstructorFormOutput, InstructorMinimal } from "@/schemas/instructor";
import {
  toggle as toggleInstructor,
  update as updateInstructor,
} from "@/services/instructor";

import { InstructorDialog } from "./InstructorDialog";
import { InstructorToggleAlert } from "./InstructorToggleAlert";

interface Props {
  loading: boolean;
  refresh: () => void;
  instructores: InstructorMinimal[];
}

export default function InstructorDataTable({
  instructores,
  refresh,
  loading,
}: Props) {
  const [selectedInstructor, setSelectedInstructor] =
    useState<InstructorMinimal>();
  const [toggleDialog, setTogleDialog] = useState(false);
  const [editInstructor, setEditInstructor] = useState(false);

  const columns: ColumnDef<InstructorMinimal>[] = [
    {
      id: "space",
    },
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
      accessorKey: "activo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Activo" />
      ),
      cell: ({ getValue }) => {
        return getValue() ? "Si" : "No";
      },
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
                  setTogleDialog(true);
                  setSelectedInstructor(instructor);
                }}
              >
                {instructor.activo ? "Deshabilitar" : "Habilitar"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function handleToggle() {
    if (!selectedInstructor) return;
    await toggleInstructor(selectedInstructor.id);

    if (selectedInstructor.activo) {
      toast.success("Instructor deshabilitado");
    } else {
      toast.success("Instructor habilitado");
    }

    setTogleDialog(false);
    await refresh();
  }

  async function handleEdit(instructor: InstructorFormOutput) {
    if (!selectedInstructor) return;
    await updateInstructor(selectedInstructor.id, instructor);
    toast.success("Instructor editado");
    setEditInstructor(false);
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
      <DataTable columns={columns} data={instructores || []} />

      <InstructorToggleAlert
        open={toggleDialog}
        setOpen={setTogleDialog}
        onAccept={handleToggle}
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
