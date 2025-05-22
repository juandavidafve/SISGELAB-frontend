import { format } from "date-fns";
import { es } from "date-fns/locale";

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
import { MovimientoInstructor } from "@/schemas/movimiento-instructor";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
  movimiento?: MovimientoInstructor;
}

export function MovimientoDeleteAlert({
  movimiento,
  open,
  setOpen,
  onAccept,
  onCancel,
}: Props) {
  if (!movimiento) return;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que desea borrar el movimiento?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {movimiento.instructor.nombre}{" "}
        {movimiento.tipo === "ENTRADA" && "entró al FabLab"}{" "}
        {movimiento.tipo === "SALIDA" && "salió del FabLab"} el{" "}
        {format(movimiento.fecha, "PPP ", { locale: es })} a las{" "}
        {format(movimiento.fecha, "hh:mm a", { locale: es })}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Borrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
