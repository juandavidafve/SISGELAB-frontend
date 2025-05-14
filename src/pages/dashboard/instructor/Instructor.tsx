import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InstructorFormOutput } from "@/schemas/instructor";
import { create as createInstructor } from "@/services/instructor";

import InstructorDataTable from "./components/InstructorDataTable";
import { InstructorDialog } from "./components/InstructorDialog";

export default function Intructor() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  async function handleCreate(instructor: InstructorFormOutput) {
    await createInstructor(instructor);

    toast.success("Instructor creado correctamente.");
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
      <InstructorDataTable />
    </>
  );
}
