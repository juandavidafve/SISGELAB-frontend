import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import { getPlantillas } from "@/services/certificados";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (idPlantilla: number) => void;
}

export function OfertaFormacionFinalizarDialog({
  open,
  setOpen,
  onSubmit,
}: Props) {
  const schema = z.object({
    id_plantilla: z.number().min(1, "Se debe seleccionar una plantilla"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id_plantilla: 0,
    },
  });

  const { result: plantillas } = useAsyncWithToken(getPlantillas, []);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    try {
      setLoading(true);
      await onSubmit(data.id_plantilla);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar plantilla de certificado</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormCombobox
              control={form.control}
              name="id_plantilla"
              items={plantillas || []}
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
      </DialogContent>
    </Dialog>
  );
}
