import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInputDateTime from "@/components/ui/form-input-datetime";
import FormSelect from "@/components/ui/form-select";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  MovimientoInstructorFormInput,
  MovimientoInstructorFormOutput,
  MovimientoInstructorFormSchema,
} from "@/schemas/movimiento-instructor";
import { getAll as getInstructores } from "@/services/instructor";

interface Props {
  defaultValues?: MovimientoInstructorFormInput;
  onSubmit: (data: MovimientoInstructorFormOutput) => void;
}

export default function MovimientoInstructorForm({ onSubmit }: Props) {
  const form = useForm<
    MovimientoInstructorFormInput,
    unknown,
    MovimientoInstructorFormOutput
  >({
    resolver: zodResolver(MovimientoInstructorFormSchema),
    defaultValues: {
      fecha: new Date(),
      id_instructor: 0,
      tipo: undefined,
    },
  });

  const { result: instructores } = useAsyncWithToken(getInstructores, []);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(movimiento: MovimientoInstructorFormOutput) {
    try {
      setLoading(true);
      await onSubmit(movimiento);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormCombobox
          control={form.control}
          name="id_instructor"
          items={instructores || []}
          itemLabel="nombre"
          itemValue="id"
          label="Instructor"
        />
        <FormInputDateTime name="fecha" control={form.control} label="Fecha" />

        <FormSelect
          control={form.control}
          name="tipo"
          items={["Entrada", "Salida"].map((tipoMovimiento) => ({
            label: tipoMovimiento,
            value: tipoMovimiento.toUpperCase(),
          }))}
          itemLabel="label"
          itemValue="value"
          label="Tipo de movimiento"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader className="size-4 text-white" />
              Guardando
            </>
          ) : (
            "Guardar"
          )}
        </Button>
      </form>
    </Form>
  );
}
