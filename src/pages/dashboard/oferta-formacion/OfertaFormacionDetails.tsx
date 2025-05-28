import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { KeyValueItem } from "@/components/KeyValueItem";
import QrDialog from "@/components/QrDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import useAuth from "@/hooks/useAuth";
import { BACKEND_BASE_URL } from "@/lib/config";
import { formatDate, formatMoney, urlMerge } from "@/lib/utils";
import { OfertaFormacionFormOutput } from "@/schemas/oferta-formacion";
import { SesionMinimal } from "@/schemas/sesion";
import {
  finalizar as finalizarOferta,
  getById as getOferta,
  toggle as toggleOferta,
  update as updateOferta,
} from "@/services/oferta-formacion";
import { marcarAsistencia } from "@/services/sesion";

import { AsistenciaDialog } from "./components/AsistenciaDialog";
import { OfertaFormacionDialog } from "./components/OfertaFormacionDialog";
import { OfertaFormacionFinalizarAlert } from "./components/OfertaFormacionFinalizarAlert";
import { OfertaFormacionFinalizarDialog } from "./components/OfertaFormacionFinalizarDialog";
import Inscripciones from "./components/inscripcion/Inscripciones";

export default function OfertaFormacionDetails() {
  const { info } = useAuth();
  const location = useLocation();
  const { id } = useParams();
  const idNum = parseInt(String(id));

  const {
    result: oferta,
    execute: refreshOferta,
    loading: loadingOferta,
  } = useAsyncWithToken(getOferta, [idNum]);
  const [showFinalizarOfertaDialog, setShowFinalizarOfertaDialog] =
    useState(false);
  const [showFinalizarOfertaAlert, setShowFinalizarOfertaAlert] =
    useState(false);
  const [editOfertaDialog, setEditOfertaDialog] = useState(false);
  const [showAsistenciaDialog, setShowAsistenciaDialog] = useState(false);
  const [selectedSesion, setSelectedSesion] = useState<SesionMinimal>();

  async function handleEditOferta(oferta: OfertaFormacionFormOutput) {
    await updateOferta(idNum, oferta);
    toast.success("Oferta de formación actualizada correctamente.");

    await refreshOferta(idNum);
    setEditOfertaDialog(false);
  }

  async function handleToggleOferta() {
    await toggleOferta(idNum);

    if (oferta?.estado === "ACTIVA") {
      toast.success("Oferta oferta desactivada");
    }

    if (oferta?.estado === "INACTIVA") {
      toast.success("Oferta activada");
    }

    await refreshOferta(idNum);
  }

  async function handleFinalizarOferta(idPlantilla: number) {
    await finalizarOferta(idNum, idPlantilla);

    toast.success("Oferta finalizada correctamente");

    setShowFinalizarOfertaDialog(false);
    await refreshOferta(idNum);
  }

  async function marcarAsistenciaConToken(token: string) {
    if (!selectedSesion) return;
    await marcarAsistencia(selectedSesion?.id, token);
    toast.success("Asistencia marcada correctamente");
    setShowAsistenciaDialog(false);
  }

  if (loadingOferta)
    return <Loader className="absolute top-1/2 left-1/2 -translate-1/2" />;

  if (!oferta) return;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-bold">{oferta.nombre}</h1>

        {info?.roles.includes("ROLE_ADMINISTRADOR") && (
          <div className="flex items-center gap-2">
            {oferta.estado === "ACTIVA" && (
              <QrDialog
                url={`${window.location.href.replace(location.pathname, "")}/inscripcion/${oferta.id}`}
              >
                <Button variant="ghost" size="icon">
                  <Icon
                    icon="material-symbols:share-outline"
                    className="size-6"
                  />
                </Button>
              </QrDialog>
            )}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <Icon icon="material-symbols:more-horiz" className="size-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setEditOfertaDialog(true)}>
                  Editar
                </DropdownMenuItem>
                {oferta.estado !== "FINALIZADA" && (
                  <>
                    <DropdownMenuItem onClick={handleToggleOferta}>
                      {oferta.estado === "INACTIVA" && "Habilitar"}
                      {oferta.estado === "ACTIVA" && "Deshabilitar"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowFinalizarOfertaAlert(true)}
                      className="text-red-500 hover:text-red-500"
                    >
                      Finalizar
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <OfertaFormacionFinalizarDialog
        open={showFinalizarOfertaDialog}
        setOpen={setShowFinalizarOfertaDialog}
        onSubmit={handleFinalizarOferta}
      />

      <OfertaFormacionFinalizarAlert
        open={showFinalizarOfertaAlert}
        setOpen={setShowFinalizarOfertaAlert}
        oferta={oferta}
        onAccept={() => setShowFinalizarOfertaDialog(true)}
      />

      <OfertaFormacionDialog
        open={editOfertaDialog}
        setOpen={setEditOfertaDialog}
        onSubmit={handleEditOferta}
        variant="EDIT"
        oferta={oferta}
      />

      {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
        info?.roles.includes("ROLE_INSTRUCTOR")) && (
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
            label="Tipos de beneficiario"
            values={oferta.tipos_beneficiario.map((e) => e.nombre)}
          />
          <KeyValueItem
            icon="material-symbols:person-outline-rounded"
            label="Beneficiarios"
            values={oferta.inscritos.length}
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

          {oferta.instituciones.length > 0 && (
            <KeyValueItem
              icon="fluent:building-24-regular"
              label="Instituciones"
              values={oferta.instituciones.map((e) => e.nombre)}
            />
          )}
        </div>
      )}

      <h2 className="my-10 mb-6 text-xl font-bold">Sesiones</h2>

      <div className="space-y-4">
        {oferta.sesiones.map((sesion) => (
          <CardSmall
            title={sesion.nombre}
            description={`${formatDate(sesion.fecha, "dd/MM/yyyy")} ${sesion.inicio}`}
            slotAction={
              <>
                {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
                  info?.roles.includes("ROLE_INSTRUCTOR")) && (
                  <Button>
                    <Link to={`../sesion/${sesion.id}`}>Ver</Link>
                  </Button>
                )}

                {info?.roles.includes("ROLE_PARTICIPANTE") && (
                  <Button
                    onClick={() => {
                      setSelectedSesion(sesion);
                      setShowAsistenciaDialog(true);
                    }}
                  >
                    Marcar Asistencia
                  </Button>
                )}
              </>
            }
            key={sesion.id}
          />
        ))}
      </div>

      <AsistenciaDialog
        onSubmit={marcarAsistenciaConToken}
        open={showAsistenciaDialog}
        setOpen={setShowAsistenciaDialog}
      />

      {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
        info?.roles.includes("ROLE_INSTRUCTOR")) && (
        <Inscripciones oferta={oferta} refresh={() => refreshOferta(idNum)} />
      )}
    </>
  );
}
