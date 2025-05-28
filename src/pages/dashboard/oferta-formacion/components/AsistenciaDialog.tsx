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
import FormInput from "@/components/ui/form-input";
import Loader from "@/components/ui/loader";
import { handleAxiosError } from "@/lib/error";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (token: string) => void;
}

export function AsistenciaDialog({ open, setOpen, onSubmit }: Props) {
  const schema = z.object({
    token: z.string().nonempty("Se requiere el token"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    try {
      setLoading(true);
      await onSubmit(data.token);
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
          <DialogTitle>Registrar asistencia</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormInput control={form.control} name="token" label="Token" />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="size-4 text-white" />
                  Enviando
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
