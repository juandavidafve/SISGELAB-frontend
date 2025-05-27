import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { OfertaFormacion } from "@/schemas/oferta-formacion";

interface Props {
  oferta?: OfertaFormacion;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

export function OfertaFormacionFinalizarAlert({
  oferta,
  open,
  setOpen,
  onAccept,
  onCancel,
}: Props) {
  if (!oferta) return;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro de finalizar la oferta de formación{" "}
            <strong className="text-red-600">{oferta.nombre}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            <strong className="text-red-600">
              Esta acción no se puede deshacer.
            </strong>{" "}
            Al finalizar la oferta, no podrá volver a activarse ni desactivarse.
            Además, se generarán automáticamente los certificados para los
            instructores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
