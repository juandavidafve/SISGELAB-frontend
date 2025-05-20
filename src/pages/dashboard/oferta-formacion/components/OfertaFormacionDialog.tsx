import { useState } from "react";

import { ExitFormAlert } from "@/components/ExitFormAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  OfertaFormacion,
  OfertaFormacionFormOutput,
  convertToFormInput as convertOfertaToFormInput,
} from "@/schemas/oferta-formacion";

import OfertaFormacionForm from "./OfertaFormacionForm";

interface Props {
  oferta?: OfertaFormacion;
  variant: "CREATE" | "EDIT";
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (oferta: OfertaFormacionFormOutput) => void;
}

export function OfertaFormacionDialog({
  variant,
  oferta,
  open,
  setOpen,
  onSubmit,
}: Props) {
  const [showExitAlert, setShowExitAlert] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? setOpen(true) : setShowExitAlert(true))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "CREATE" && "Agregar oferta de formación"}
            {variant === "EDIT" && "Editar oferta de formación"}
          </DialogTitle>
        </DialogHeader>
        <OfertaFormacionForm
          onSubmit={onSubmit}
          defaultValues={oferta && convertOfertaToFormInput(oferta)}
        />
        <ExitFormAlert
          open={showExitAlert}
          setOpen={setShowExitAlert}
          onAccept={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
