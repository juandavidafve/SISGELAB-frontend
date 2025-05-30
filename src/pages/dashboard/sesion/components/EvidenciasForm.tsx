import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import Loader from "@/components/ui/loader";
import { handleAxiosError } from "@/lib/error";
import { EvidenciaForm, EvidenciaFormSchema } from "@/schemas/evidencia";

interface Props {
  defaultValues?: EvidenciaForm;
  onSubmit: (data: EvidenciaForm) => void;
}

export default function EvidenciasForm({ onSubmit }: Props) {
  const form = useForm<EvidenciaForm>({
    resolver: zodResolver(EvidenciaFormSchema),
    defaultValues: {
      nombre: "",
      file: undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(plantilla: EvidenciaForm) {
    try {
      setLoading(true);
      await onSubmit(plantilla);
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
        <FormInput control={form.control} name="nombre" label="Nombre" />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archivo</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value ? [field.value] : []}
                  onValueChange={(files) => {
                    field.onChange(files[files.length - 1]);
                  }}
                >
                  {field.value ? (
                    <FileUploadList>
                      <FileUploadItem
                        key={field.value.name}
                        value={field.value}
                      />
                    </FileUploadList>
                  ) : (
                    <FileUploadDropzone />
                  )}
                </FileUpload>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
