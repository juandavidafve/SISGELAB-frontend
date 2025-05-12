import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormInputDate from "@/components/ui/form-input-date";
import FormSelect from "@/components/ui/form-select";
import GenericEntitySelect from "@/components/ui/generic-entity-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleAxiosError } from "@/lib/error";
import {
  DatosPersonalesFormInput,
  DatosPersonalesFormOutput,
  DatosPersonalesFormSchema,
} from "@/schemas/datos-personales";

interface DatosPersonalesFormProps {
  onSubmit: (data: DatosPersonalesFormOutput) => void;
  municipios: { id: number; nombre: string }[];
  paises: { id: number; nombre: string }[];
  poblaciones: { id: number; nombre: string }[];
  estadosCiviles: { id: number; nombre: string }[];
  modalidades: { id: number; nombre: string }[];
  tiposDocumento: { id: number; nombre: string }[];
}

export default function DatosPersonalesForm({
  onSubmit,
}: DatosPersonalesFormProps) {
  const form = useForm<
    DatosPersonalesFormInput,
    unknown,
    DatosPersonalesFormOutput
  >({
    resolver: zodResolver(DatosPersonalesFormSchema),
    defaultValues: {
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      id_tipo_documento: undefined,
      documento: "",
      fecha_expedicion: new Date(),
      sexo: undefined,
      fecha_nacimiento: new Date(),
      id_pais: undefined,
      id_municipio: undefined,
      telefono: "",
      correo_personal: "",
      correo_institucional: "",
      direccion_institucional: "",
      id_poblacion_especial: undefined,
      id_estado_civil: undefined,
      direccion: "",
      entidad: "",
      id_modalidad: undefined,
    },
  });

  async function handleSubmit(datosPersonales: DatosPersonalesFormOutput) {
    try {
      await onSubmit(datosPersonales);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    }
  }

  const tiposDocumento = [
    {
      id: 0,
      nombre: "Tarjeta de Identidad",
    },
    {
      id: 1,
      nombre: "Cedula",
    },
  ];

  const paises = [
    {
      id: 1,
      nombre: "Colombia",
    },
    {
      id: 2,
      nombre: "Venezuela",
    },
  ];

  const municipios = [
    {
      id: 1,
      nombre: "Cucuta",
    },
    {
      id: 2,
      nombre: "Zulia",
    },
  ];

  const poblacionesEspeciales = [
    {
      id: 1,
      nombre: "Poblacion especial 1",
    },
    {
      id: 2,
      nombre: "Poblacion especial 2",
    },
    {
      id: 3,
      nombre: "Poblacion especial 3",
    },
  ];

  const estadosCiviles = [
    {
      id: 1,
      nombre: "Casado",
    },
    {
      id: 2,
      nombre: "Soltero",
    },
  ];

  const modalidades = [
    {
      id: 1,
      nombre: "Modalidad 1",
    },
    {
      id: 2,
      nombre: "Modalidad 2",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormInput
          name="primer_nombre"
          control={form.control}
          label="Primer nombre"
        />

        <FormInput
          name="segundo_nombre"
          control={form.control}
          label="Segundo nombre"
        />

        <FormInput
          name="primer_apellido"
          control={form.control}
          label="Primer apellido"
        />

        <FormInput
          name="segundo_apellido"
          control={form.control}
          label="Segundo apellido"
        />

        <div>
          Documento de Identidad
          <div className="mt-1 flex items-end gap-2">
            <FormSelect
              control={form.control}
              name="id_tipo_documento"
              items={tiposDocumento}
              itemLabel="nombre"
              itemValue="id"
            />

            <FormInput control={form.control} name="documento" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="sexo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["Masculino", "Femenino"].map((item) => (
                      <SelectItem key={item} value={item.toUpperCase()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInputDate
          control={form.control}
          name="fecha_expedicion"
          label="Fecha de expedición"
        />

        <FormInputDate
          control={form.control}
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
        />

        <FormCombobox
          control={form.control}
          name="id_pais"
          itemLabel="nombre"
          itemValue="id"
          items={paises}
          label="País"
        />

        <FormCombobox
          control={form.control}
          name="id_municipio"
          itemLabel="nombre"
          itemValue="id"
          items={municipios}
          label="Municipio"
        />

        <FormInput control={form.control} name="telefono" label="Teléfono" />
        <FormInput
          control={form.control}
          name="correo_personal"
          label="Correo personal"
        />
        <FormInput
          control={form.control}
          name="correo_institucional"
          label="Correo institucional"
        />

        <FormInput
          control={form.control}
          name="direccion_institucional"
          label="Dirección institucional"
        />

        <FormSelect
          control={form.control}
          name="id_poblacion_especial"
          items={poblacionesEspeciales}
          itemLabel="nombre"
          itemValue="id"
          label="Población especial"
        />

        <FormField
          control={form.control}
          name="id_estado_civil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <FormControl>
                <GenericEntitySelect items={estadosCiviles} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInput name="direccion" control={form.control} label="Dirección" />
        <FormInput name="entidad" control={form.control} label="Entidad" />
        <FormSelect
          name="id_modalidad"
          control={form.control}
          label="Modalidad"
          items={modalidades}
          itemValue="id"
          itemLabel="nombre"
        />

        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
