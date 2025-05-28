import { useState } from "react";

import { ExitFormAlert } from "@/components/ExitFormAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ParticipanteFormOutput } from "@/schemas/participante";

import ParticipanteForm from "./ParticipanteForm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (participante: ParticipanteFormOutput) => void;
}

export function ParticipanteDialog({ open, setOpen, onSubmit }: Props) {
  const [showExitAlert, setShowExitAlert] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? setOpen(true) : setShowExitAlert(true))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar participante</DialogTitle>
        </DialogHeader>
        <ParticipanteForm onSubmit={onSubmit} />
        <ExitFormAlert
          open={showExitAlert}
          setOpen={setShowExitAlert}
          onAccept={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
