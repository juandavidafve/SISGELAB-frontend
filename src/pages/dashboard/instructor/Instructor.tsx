import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { InstructorFormOutput } from "@/schemas/instructor";
import {
  create as createInstructor,
  getAll as getInstructores,
} from "@/services/instructor";

import InstructorDataTable from "./components/InstructorDataTable";
import { InstructorDialog } from "./components/InstructorDialog";

export default function Instructor() {
  const {
    result: instructores,
    execute: refreshInstructores,
    loading: instructoresLoading,
  } = useAsyncWithToken(getInstructores, []);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  async function handleCreate(instructor: InstructorFormOutput) {
    await createInstructor(instructor);

    toast.success("Instructor creado correctamente.");
    await refreshInstructores();
    setOpenCreateDialog(false);
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Instructores</h1>

        <Button onClick={() => setOpenCreateDialog(true)}>Crear</Button>
      </div>
      <InstructorDialog
        onSubmit={handleCreate}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        variant="CREATE"
      />

      <InstructorDataTable
        instructores={instructores || []}
        loading={instructoresLoading}
        refresh={refreshInstructores}
      />
    </>
  );
}
