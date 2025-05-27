import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import { getAllNoInscritos } from "@/services/participante";

interface Props {
  onSubmit: (idParticipante: number) => void;
}

export default function InscripcionForm({ onSubmit }: Props) {
  const { id } = useParams();
  const idNum = parseInt(String(id));

  const schema = z.object({
    id_participante: z.number().min(1, "Se debe seleccionar un participante"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id_participante: 0,
    },
  });

  const { result: participantes } = useAsyncWithToken(getAllNoInscritos, [
    idNum,
  ]);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(inscripcion: z.infer<typeof schema>) {
    try {
      setLoading(true);
      await onSubmit(inscripcion.id_participante);
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
        <FormCombobox
          control={form.control}
          name="id_participante"
          items={participantes || []}
          itemLabel="nombre"
          itemValue="id"
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
