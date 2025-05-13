import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { KeyValueItem } from "@/components/KeyValueItem";
import QrDialog from "@/components/QrDialog";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { BACKEND_BASE_URL } from "@/lib/config";
import { formatDate, formatMoney, urlMerge } from "@/lib/utils";
import {
  convertOfertaToFormInput,
  OfertaFormacionFormOutput,
} from "@/schemas/oferta-formacion";
import {
  getById as getOferta,
  update as updateOferta,
} from "@/services/oferta-formacion";

import OfertaFormacionForm from "./components/OfertaFormacionForm";

export default function OfertaFormacionDetails() {
  const { id } = useParams();
  const idNum = parseInt(String(id));

  const { result: oferta, execute: refreshOferta } = useAsyncWithToken(
    getOferta,
    [idNum],
  );
  const [editOfertaDialog, setEditOfertaDialog] = useState(false);

  async function handleEditOferta(oferta: OfertaFormacionFormOutput) {
    await updateOferta(idNum, oferta);
    toast.success("Oferta de formación actualizada correctamente.");

    await refreshOferta(idNum);
    setEditOfertaDialog(false);
  }

  if (!oferta) return;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-bold">{oferta.nombre}</h1>

        <div className="flex gap-2">
          <QrDialog url={oferta.pieza_grafica}>
            <Button variant="ghost" size="icon">
              <Icon icon="material-symbols:share-outline" className="size-6" />
            </Button>
          </QrDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Icon
                  icon="material-symbols:image-outline-rounded"
                  className="size-6"
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Pieza gráfica</DialogTitle>
              </DialogHeader>
              <img
                src={urlMerge(BACKEND_BASE_URL, oferta.pieza_grafica)}
                alt={`Pieza gráfica de ${oferta.nombre}`}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={editOfertaDialog} onOpenChange={setEditOfertaDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon
                  icon="material-symbols:edit-square-outline-rounded"
                  className="size-6"
                />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar oferta de formación</DialogTitle>
              </DialogHeader>
              <OfertaFormacionForm
                onSubmit={handleEditOferta}
                defaultValues={convertOfertaToFormInput(oferta)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <KeyValueItem
          icon="material-symbols:barcode-scanner-rounded"
          label="Código"
          values={oferta.id}
        />
        <KeyValueItem
          icon="material-symbols:numbers-rounded"
          label="Id. CINE"
          values={oferta.cine}
        />
        <KeyValueItem
          icon="ic:round-plus"
          label="Extensión"
          values={oferta.extension ? "Sí" : "No"}
        />
        <div className="flex gap-4">
          <KeyValueItem
            icon="material-symbols:calendar-month-outline-rounded"
            label="Inicio"
            values={formatDate(oferta.fecha_inicio, "dd/MM/yyyy")}
          />
          <KeyValueItem
            label="Fin"
            values={formatDate(oferta.fecha_fin, "dd/MM/yyyy")}
          />
        </div>
        <KeyValueItem
          icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
          label="Horas"
          values={oferta.horas}
        />
        <KeyValueItem
          icon="material-symbols:deployed-code-outline-sharp"
          label="Tipo"
          values={oferta.tipo_oferta.nombre}
        />
        <KeyValueItem
          icon="material-symbols:category-outline-rounded"
          label="Categoría"
          values={oferta.categoria.nombre}
        />
        <KeyValueItem
          icon="material-symbols:person-outline-rounded"
          label="Beneficiarios"
          values={`${oferta.inscritos.length} ${oferta.tipo_beneficiario.nombre}`}
        />
        <KeyValueItem
          icon="material-symbols:calendar-month-outline-rounded"
          label="Semestre"
          values={oferta.semestre}
        />
        <KeyValueItem
          icon="material-symbols:price-change-outline-rounded"
          label="Valor"
          values={formatMoney(oferta.valor)}
        />

        <KeyValueItem
          icon="fluent:building-24-regular"
          label={oferta.institucion.tipoInstitucion}
          values={oferta.institucion.nombre}
        />
      </div>

      <h2 className="my-10 mb-6 text-xl font-bold">Sesiones</h2>

      <div className="space-y-4">
        {oferta.sesiones.map((sesion) => (
          <CardSmall
            title={sesion.nombre}
            description={`${formatDate(sesion.fecha, "dd/MM/yyyy")} ${sesion.inicio}`}
            slotAction={<Button>Ver</Button>}
            key={sesion.id}
          />
        ))}
      </div>

      <div className="my-10 mb-6 flex justify-between">
        <h2 className="text-xl font-bold">Inscripciones</h2>
        <Button>Inscribir</Button>
      </div>

      <div className="space-y-4">
        <DataTable
          columns={[
            {
              accessorKey: "id",
            },
            {
              header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nombre" />
              ),
              accessorKey: "nombre",
            },
          ]}
          data={oferta.inscritos}
        />
      </div>
    </>
  );
}
