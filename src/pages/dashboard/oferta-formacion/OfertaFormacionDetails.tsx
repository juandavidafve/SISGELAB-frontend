import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "sonner";

import QrDialog from "@/components/QrDialog";
import { Badge } from "@/components/ui/badge";
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
import { urlMerge } from "@/lib/utils";
import { OfertaFormacionFormOutput } from "@/schemas/oferta-formacion";
import {
  finalizar as finalizarOferta,
  getById as getOferta,
  toggle as toggleOferta,
  update as updateOferta,
} from "@/services/oferta-formacion";

import Inscripciones from "./components/inscripcion/Inscripciones";
import { OfertaFormacionDialog } from "./components/oferta-formacion/OfertaFormacionDialog";
import { OfertaFormacionFinalizarAlert } from "./components/oferta-formacion/OfertaFormacionFinalizarAlert";
import { OfertaFormacionFinalizarDialog } from "./components/oferta-formacion/OfertaFormacionFinalizarDialog";
import OfertaFormacionInfo from "./components/oferta-formacion/OfertaFormacionInfo";
import Sesiones from "./components/sesiones/Sesiones";

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

  if (loadingOferta)
    return <Loader className="absolute top-1/2 left-1/2 -translate-1/2" />;

  if (!oferta) return;

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">{oferta.nombre}</h1>
          <Badge
            className="w-28"
            variant={
              oferta.estado === "ACTIVA"
                ? "green"
                : oferta.estado === "INACTIVA"
                  ? "red"
                  : "neutral"
            }
          >
            {oferta.estado}
          </Badge>
        </div>
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
        <OfertaFormacionInfo oferta={oferta} />
      )}

      <Sesiones oferta={oferta} refresh={() => refreshOferta(idNum)} />

      {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
        info?.roles.includes("ROLE_INSTRUCTOR")) && (
        <Inscripciones oferta={oferta} refresh={() => refreshOferta(idNum)} />
      )}
    </>
  );
}
