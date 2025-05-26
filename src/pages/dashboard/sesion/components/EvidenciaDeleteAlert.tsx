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
import { Evidencia } from "@/schemas/evidencia";

interface Props {
  evidencia?: Evidencia;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

export function EvidenciaDeleteAlert({
  evidencia,
  open,
  setOpen,
  onAccept,
  onCancel,
}: Props) {
  if (!evidencia) return;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que desea borrar la evidencia{" "}
            <strong className="text-red-600">{evidencia.nombre}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            La evidencia será eliminada permanentemente
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
