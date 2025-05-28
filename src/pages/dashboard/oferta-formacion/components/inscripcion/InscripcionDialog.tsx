import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OfertaFormacion } from "@/schemas/oferta-formacion";
import { ParticipanteFormOutput } from "@/schemas/participante";
import { inscribirParticipante } from "@/services/oferta-formacion";
import { create as createParticipante } from "@/services/participante";

import { ParticipanteDialog } from "../participante/ParticipanteDialog";
import InscripcionForm from "./InscripcionForm";

interface Props {
  oferta: OfertaFormacion;
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
}

export function InscripcionDialog({ open, setOpen, oferta, refresh }: Props) {
  const [openParticipanteDialog, setOpenParticipanteDialog] = useState(false);

  async function handleInscripcion(idParticipante: number) {
    await inscribirParticipante(oferta.id, idParticipante);
    toast.success("Participante inscrito correctamente");
    await refresh();
    setOpen(false);
  }

  async function handleCreateParticipante(
    participante: ParticipanteFormOutput,
  ) {
    const res = await createParticipante(participante);
    await handleInscripcion(res.id);
    setOpenParticipanteDialog(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-8">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Inscribir participante</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setOpen(false);
                setOpenParticipanteDialog(true);
              }}
            >
              <Icon
                icon="material-symbols:person-add-outline-rounded"
                className="size-6"
              />
              <span className="sr-only">Agregar</span>
            </Button>
          </DialogHeader>
          <InscripcionForm onSubmit={handleInscripcion} />
        </DialogContent>
      </Dialog>
      <ParticipanteDialog
        onSubmit={handleCreateParticipante}
        open={openParticipanteDialog}
        setOpen={setOpenParticipanteDialog}
      />
    </>
  );
}
