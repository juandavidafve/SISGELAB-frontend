import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { MovimientoInstructorFormOutput } from "@/schemas/movimiento-instructor";
import {
  getAll as getMovimientos,
  create as createMovimiento,
} from "@/services/movimiento-instructor";

import MovimientoInstructorDataTable from "./components/MovimientoInstructorDataTable";
import { MovimientoInstructorDialog } from "./components/MovimientoInstructorDialog";

export default function MovimientodInstructor() {
  const {
    result: movimientos,
    execute: refreshMovimientos,
    loading: movimientosLoading,
  } = useAsyncWithToken(getMovimientos, []);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  async function handleCreate(movimiento: MovimientoInstructorFormOutput) {
    await createMovimiento(movimiento);

    toast.success("Movimiento registrado correctamente.");
    await refreshMovimientos();
    setOpenCreateDialog(false);
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">
          Entradas y salidas de instructores
        </h1>

        <Button onClick={() => setOpenCreateDialog(true)}>
          Nuevo registro
        </Button>
      </div>
      <MovimientoInstructorDialog
        onSubmit={handleCreate}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />

      <MovimientoInstructorDataTable
        refresh={refreshMovimientos}
        movimientos={movimientos || []}
        loading={movimientosLoading}
      />
    </>
  );
}
