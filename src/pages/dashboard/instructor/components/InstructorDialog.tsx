import { useState } from "react";

import { ExitFormAlert } from "@/components/ExitFormAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import {
  convertToFormInput as convertInstructorToFormInput,
  InstructorFormOutput,
  InstructorMinimal,
} from "@/schemas/instructor";
import { getById as getInstructorById } from "@/services/instructor";

import InstructorForm from "./InstructorForm";

interface Props {
  instructor?: InstructorMinimal;
  variant: "CREATE" | "EDIT";
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (instructor: InstructorFormOutput) => void;
}

export function InstructorDialog({
  variant,
  instructor,
  open,
  setOpen,
  onSubmit,
}: Props) {
  const { result: instructorDetails } = useAsyncWithToken(
    async (id) => {
      if (!id) return;

      return await getInstructorById(id);
    },
    [instructor?.id],
  );

  const [showExitAlert, setShowExitAlert] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? setOpen(true) : setShowExitAlert(true))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "CREATE" && "Agregar Instructor"}
            {variant === "EDIT" && "Editar Instructor"}
          </DialogTitle>
        </DialogHeader>
        <InstructorForm
          onSubmit={onSubmit}
          defaultValues={
            instructorDetails && convertInstructorToFormInput(instructorDetails)
          }
        />
        <ExitFormAlert
          open={showExitAlert}
          setOpen={setShowExitAlert}
          onAccept={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
