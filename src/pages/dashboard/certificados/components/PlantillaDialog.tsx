import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlantillaCertificadoForm } from "@/schemas/plantillas-certificados";

import PlantillaForm from "./PlantillaForm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (plantilla: PlantillaCertificadoForm) => void;
}

export function PlantillaDialog({ open, setOpen, onSubmit }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar plantilla de certificado</DialogTitle>
        </DialogHeader>
        <PlantillaForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
