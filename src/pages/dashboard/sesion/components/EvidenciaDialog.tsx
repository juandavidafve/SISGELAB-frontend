import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EvidenciaForm } from "@/schemas/evidencia";

import EvidenciasForm from "./EvidenciasForm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (evidencia: EvidenciaForm) => void;
}

export function EvidenciaDialog({ open, setOpen, onSubmit }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar evidencia</DialogTitle>
        </DialogHeader>
        <EvidenciasForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
