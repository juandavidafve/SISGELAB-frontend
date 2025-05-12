import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
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
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { InputNumber } from "@/components/ui/input-number";
import SelectIdName from "@/components/ui/select-id-name";
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
  onSubmit: (oferta: OfertaFormacionFormOutput) => void;
}

export default function OfertaFormacionForm({
  onSubmit,
}: OfertaFormacionFormProps) {
  const form = useForm<
    OfertaFormacionFormInput,
    unknown,
    OfertaFormacionFormOutput
  >({
    resolver: zodResolver(OfertaFormacionFormSchema),
    defaultValues: {
      nombre: "",
      codigo: "",
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
      sesiones: [
        {
          fecha: new Date(),
          inicio: "00:00",
          fin: "00:00",
          id_sala: 0,
          instructores: [],
        },
      ],
      file: undefined,
    },
  });

  const { result: instituciones } = useAsyncWithToken(getInstituciones, []);
  const { result: tiposOferta } = useAsyncWithToken(getTiposOferta, []);
  const { result: categorias } = useAsyncWithToken(getCategorias, []);
  const { result: tiposBeneficiario } = useAsyncWithToken(
    getTiposBeneficiario,
    [],
  );

  async function handleSubmit(oferta: OfertaFormacionFormOutput) {
    try {
      await onSubmit(oferta);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CINE</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extension"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Es extensión?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha_inicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de inicio</FormLabel>
              <FormControl>
                <InputDate value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de fin</FormLabel>
              <FormControl>
                <InputDate value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horas</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semestre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semestre</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {tiposOferta && (
          <FormField
            control={form.control}
            name="id_tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de oferta</FormLabel>
                <SelectIdName {...field} items={tiposOferta} />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {categorias && (
          <FormField
            control={form.control}
            name="id_categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <SelectIdName {...field} items={categorias} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {tiposBeneficiario && (
          <FormField
            control={form.control}
            name="id_tipo_beneficiario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de beneficiario</FormLabel>
                <FormControl>
                  <SelectIdName {...field} items={tiposBeneficiario} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="cupo_maximo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cupo máximo</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {instituciones && (
          <FormField
            control={form.control}
            name="id_institucion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institución</FormLabel>
                <FormControl>
                  <Combobox
                    value={instituciones.find(
                      (institucion) => institucion.id === field.value,
                    )}
                    items={instituciones}
                    itemLabel={(institucion) => institucion.nombre}
                    itemValue={(institucion) => institucion.id}
                    onChange={(institucion) => field.onChange(institucion?.id)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="sesiones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sesiones</FormLabel>
              <FormControl>
                <SesionForm {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    console.log(files);
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

        <Button type="submit" className="w-full">
          Crear
        </Button>
      </form>
    </Form>
  );
}
