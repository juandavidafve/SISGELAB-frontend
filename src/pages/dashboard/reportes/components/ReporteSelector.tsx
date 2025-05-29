import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/ui/form-select";
import Loader from "@/components/ui/loader";
import { handleAxiosError } from "@/lib/error";

const schema = z.object({
  plantilla: z.enum(
    [
      "PLANTILLA_CURSOS",
      "PLANTILLA_EDUCACION_CONTINUA",
      "PLANTILLA_PRACTICANTES",
      "PLANTILLA_PARTICIPANTES",
    ],
    {
      message: "Se debe seleccionar la plantilla",
    },
  ),
});

interface Props {
  onSubmit: (plantilla: z.infer<typeof schema>["plantilla"]) => void;
}

export default function ReporteSelector({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      plantilla: undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    try {
      setLoading(true);
      await onSubmit(data.plantilla);
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormSelect
          control={form.control}
          name="plantilla"
          items={[
            { label: "Cursos", value: "PLANTILLA_CURSOS" },
            {
              label: "Educación Continua",
              value: "PLANTILLA_EDUCACION_CONTINUA",
            },
            { label: "Practicantes", value: "PLANTILLA_PRACTICANTES" },
            { label: "Participantes", value: "PLANTILLA_PARTICIPANTES" },
          ]}
          label="Plantilla"
          itemValue="value"
          itemLabel="label"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader className="size-4 text-white" />
              Generando
            </>
          ) : (
            "Generar reporte"
          )}
        </Button>
      </form>
    </Form>
  );
}
