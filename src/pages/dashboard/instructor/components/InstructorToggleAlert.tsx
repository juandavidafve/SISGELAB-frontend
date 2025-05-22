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

export function InstructorToggleAlert({
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
            ¿Está seguro que desea{" "}
            {instructor.activo ? "deshabilitar" : "habilitar"} al instructor{" "}
            <strong className="text-red-600">{instructor.nombre}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {instructor.activo
              ? "El instructor será deshabilitado y no podrá acceder al sistema."
              : "El instructor será habilitado y obtendrá acceso al sistema."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>
            {instructor.activo ? "Deshabilitar" : "Habilitar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
