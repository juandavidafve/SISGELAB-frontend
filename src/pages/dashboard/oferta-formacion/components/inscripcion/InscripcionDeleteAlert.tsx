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
import { BaseEntity } from "@/schemas/generic";

interface Props {
  participante?: BaseEntity;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

export function InscripcionDeleteAlert({
  participante,
  open,
  setOpen,
  onAccept,
  onCancel,
}: Props) {
  if (!participante) return;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que desea eliminar la inscripción de{" "}
            <strong className="text-red-600">{participante.nombre}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            El participante será eliminado de esta oferta de formación
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
