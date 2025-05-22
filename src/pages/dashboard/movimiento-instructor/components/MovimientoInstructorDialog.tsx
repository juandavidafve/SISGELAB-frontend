import { useState } from "react";

import { ExitFormAlert } from "@/components/ExitFormAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovimientoInstructorFormOutput } from "@/schemas/movimiento-instructor";

import MovimientoInstructorForm from "./MovimientoInstructorForm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (movimiento: MovimientoInstructorFormOutput) => void;
}

export function MovimientoInstructorDialog({ open, setOpen, onSubmit }: Props) {
  const [showExitAlert, setShowExitAlert] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? setOpen(true) : setShowExitAlert(true))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Movimiento</DialogTitle>
        </DialogHeader>
        <MovimientoInstructorForm onSubmit={onSubmit} />
        <ExitFormAlert
          open={showExitAlert}
          setOpen={setShowExitAlert}
          onAccept={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
