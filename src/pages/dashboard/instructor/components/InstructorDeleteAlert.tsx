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
import { InstructorMinimal } from "@/schemas/instructor";

interface Props {
  instructor?: InstructorMinimal;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

export function InstructorDeleteAlert({
  instructor,
  open,
  setOpen,
  onAccept,
  onCancel,
}: Props) {
  if (!instructor) return;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que desea deshabilitar al instructor{" "}
            <strong className="text-red-600">{instructor.nombre}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Esta acción no se puede deshacer. El instructor será deshabilitado y
            no podrá acceder al sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Deshabilitar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
