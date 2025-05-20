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
import FormCheckbox from "@/components/ui/form-checkbox";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormInputDate from "@/components/ui/form-input-date";
import FormInputNumber from "@/components/ui/form-input-number";
import FormSelect from "@/components/ui/form-select";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  OfertaFormacionFormInput,
  OfertaFormacionFormOutput,
  OfertaFormacionFormSchema,
} from "@/schemas/oferta-formacion";
import { getAll as getInstituciones } from "@/services/institucion";
import {
  getCategorias,
  getTiposBeneficiario,
  getTiposOferta,
} from "@/services/oferta-formacion";

import SesionForm from "./SesionForm";

interface OfertaFormacionFormProps {
  defaultValues?: OfertaFormacionFormInput;
  onSubmit: (oferta: OfertaFormacionFormOutput) => void;
}

export default function OfertaFormacionForm({
  onSubmit,
  defaultValues,
}: OfertaFormacionFormProps) {
  const form = useForm<
    OfertaFormacionFormInput,
    unknown,
    OfertaFormacionFormOutput
  >({
    resolver: zodResolver(OfertaFormacionFormSchema),
    defaultValues: {
      cine: 0,
      extension: false,
      horas: 0,
      semestre: 0,
      valor: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      id_tipo: undefined,
      id_categoria: undefined,
      id_tipo_beneficiario: undefined,
      cupo_maximo: 0,
      id_institucion: 0,
      sesiones: [],
      file: undefined,
      ...defaultValues,
    },
  });

  const { result: instituciones } = useAsyncWithToken(getInstituciones, []);
  const { result: tiposOferta } = useAsyncWithToken(getTiposOferta, []);
  const { result: categorias } = useAsyncWithToken(getCategorias, []);
  const { result: tiposBeneficiario } = useAsyncWithToken(
    getTiposBeneficiario,
    [],
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(oferta: OfertaFormacionFormOutput) {
    try {
      setLoading(true);
      await onSubmit(oferta);
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
        <FormInput control={form.control} name="nombre" label="Nombre" />
        <FormInput control={form.control} name="codigo" label="Código" />
        <FormInputNumber control={form.control} name="cine" label="CINE" />
        <FormCheckbox
          control={form.control}
          name="extension"
          label="¿Es extensión?"
        />
        <FormInputDate
          control={form.control}
          name="fecha_inicio"
          label="Fecha de inicio"
        />

        <FormInputDate
          control={form.control}
          name="fecha_fin"
          label="Fecha de fin"
        />

        <FormInputNumber control={form.control} name="horas" label="Horas" />
        <FormInputNumber
          control={form.control}
          name="semestre"
          label="Semestre"
        />

        <FormInputNumber control={form.control} name="valor" label="Valor" />

        {tiposOferta && (
          <FormSelect
            control={form.control}
            name="id_tipo"
            items={tiposOferta}
            itemLabel="nombre"
            itemValue="id"
            label="Tipo de oferta"
          />
        )}

        {categorias && (
          <FormSelect
            control={form.control}
            name="id_categoria"
            items={categorias}
            itemLabel="nombre"
            itemValue="id"
            label="Categoría"
          />
        )}

        {tiposBeneficiario && (
          <FormSelect
            control={form.control}
            name="id_tipo_beneficiario"
            items={tiposBeneficiario}
            itemLabel="nombre"
            itemValue="id"
            label="Tipo de beneficiario"
          />
        )}

        <FormInputNumber
          control={form.control}
          name="cupo_maximo"
          label="Cupo máximo"
        />

        {instituciones && (
          <FormCombobox
            control={form.control}
            name="id_institucion"
            items={instituciones}
            itemLabel="nombre"
            itemValue="id"
            label="Institucion"
          />
        )}

        <SesionForm control={form.control} />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pieza gráfica</FormLabel>
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
