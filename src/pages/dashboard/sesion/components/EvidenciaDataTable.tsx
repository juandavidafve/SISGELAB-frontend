import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import { handleAxiosError } from "@/lib/error";
import { Evidencia } from "@/schemas/evidencia";
import { InstructorMinimalSchema } from "@/schemas/instructor";
import { Sesion } from "@/schemas/sesion";
import { deleteEvidencia } from "@/services/sesion";

import { EvidenciaDeleteAlert } from "./EvidenciaDeleteAlert";

interface Props {
  sesion: Sesion;
  refresh: () => void;
}

export default function EvidenciaDataTable({ sesion, refresh }: Props) {
  const { info } = useAuth();
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia>();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const columns: ColumnDef<Evidencia>[] = [
    {
      id: "spacer",
      enableHiding: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      accessorKey: "nombre",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instructor" />
      ),
      cell: ({ getValue }) => {
        const { data, error } = InstructorMinimalSchema.safeParse(getValue());

        if (error) return;

        return data.nombre;
      },
      accessorKey: "instructor",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const evidencia = row.original;

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
                  handleDownload(evidencia);
                }}
              >
                Descargar
              </DropdownMenuItem>
              {info?.roles.includes("ROLE_INSTRUCTOR") && (
                <DropdownMenuItem
                  onClick={() => {
                    setShowDeleteAlert(true);
                    setSelectedEvidencia(evidencia);
                  }}
                >
                  Borrar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function handleDelete() {
    if (!selectedEvidencia) return;
    await deleteEvidencia(sesion.id, selectedEvidencia.id);

    toast.success("Evidencia borrada");

    setShowDeleteAlert(false);
    await refresh();
  }

  const handleDownload = async (evidencia: Evidencia) => {
    toast.info("Iniciando descarga...");
    try {
      const response = await api.get(evidencia.url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = evidencia.nombre || "archivo-descargado";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Evidencia descargada");
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      } else {
        toast.error("Error al descargar el archivo");
        console.error(error);
      }
    }
  };

  return (
    <>
      <DataTable columns={columns} data={sesion.evidencias} />
      <EvidenciaDeleteAlert
        evidencia={selectedEvidencia}
        onAccept={handleDelete}
        open={showDeleteAlert}
        setOpen={setShowDeleteAlert}
      />
    </>
  );
}
