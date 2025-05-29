import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import Loader from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleAxiosError } from "@/lib/error";
import { Reporte } from "@/schemas/reporte";

interface Props {
  reporte: Reporte;
  onDownload: () => void;
}

export default function ReporteDataTable({ reporte, onDownload }: Props) {
  const [downloading, setDownloading] = useState(false);

  const columSchemas: ColumnDef<Reporte[number]["datos"][number]>[][] =
    reporte.map((hoja) => {
      return [
        {
          id: "spacer",
          enableHiding: false,
        },
        ...Object.keys(hoja.datos[0]).map(
          (key): ColumnDef<Reporte[number]["datos"][number]> => ({
            accessorKey: key,
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title={key} />
            ),
          }),
        ),
      ];
    });

  async function handleDownload() {
    try {
      setDownloading(true);
      await onDownload();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Tabs className="my-6" defaultValue={reporte[0]?.nombre}>
      <div className="flex justify-between">
        <TabsList>
          {reporte.map((hoja) => (
            <TabsTrigger
              key={hoja.nombre}
              value={hoja.nombre}
              className="cursor-pointer"
            >
              {hoja.nombre}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button disabled={downloading} onClick={handleDownload}>
          {downloading ? (
            <>
              <Loader className="size-4 text-white" />
              Descargando
            </>
          ) : (
            "Descargar"
          )}
        </Button>
      </div>

      {reporte.map((hoja, i) => (
        <TabsContent value={hoja.nombre} key={hoja.nombre}>
          <DataTable columns={columSchemas[i]} data={hoja.datos} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
