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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      </DialogContent>
    </Dialog>
  );
}
