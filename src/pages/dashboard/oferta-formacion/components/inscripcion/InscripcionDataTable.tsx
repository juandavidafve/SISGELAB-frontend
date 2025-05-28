import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
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
import { handleAxiosError } from "@/lib/error";
import { BaseEntity } from "@/schemas/generic";
import { OfertaFormacion } from "@/schemas/oferta-formacion";
import { desinscribirParticipante } from "@/services/oferta-formacion";

import { InscripcionDeleteAlert } from "./InscripcionDeleteAlert";

interface Props {
  refresh: () => void;
  oferta: OfertaFormacion;
}

export default function InscripcionDataTable({ oferta, refresh }: Props) {
  const [selectedParticipante, setSelectedParticipante] =
    useState<BaseEntity>();
  const [toggleDialog, setTogleDialog] = useState(false);

  const columns: ColumnDef<BaseEntity>[] = [
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const participante = row.original;

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
                  setTogleDialog(true);
                  setSelectedParticipante(participante);
                }}
              >
                Anular inscripción
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function handleDelete() {
    try {
      if (!selectedParticipante) return;
      await desinscribirParticipante(oferta.id, selectedParticipante.id);

      toast.success("Inscripción eliminada");

      setTogleDialog(false);
      await refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    }
  }

  return (
    <>
      <DataTable columns={columns} data={oferta.inscritos || []} />

      <InscripcionDeleteAlert
        open={toggleDialog}
        setOpen={setTogleDialog}
        onAccept={handleDelete}
        participante={selectedParticipante}
      />
    </>
  );
}
