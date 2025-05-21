import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
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
import FormCheckbox from "@/components/ui/form-checkbox";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormInputDate from "@/components/ui/form-input-date";
import FormSelect from "@/components/ui/form-select";
import { InputPassword } from "@/components/ui/input-password";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  InstructorFormInput,
  InstructorFormOutput,
  InstructorFormSchema,
} from "@/schemas/instructor";
import { getAll as getModalidades } from "@/services/modalidad";
import { getAll as getMunicipios } from "@/services/municipio";
import { getAll as getPaises } from "@/services/pais";
import { getAll as getTiposDocumento } from "@/services/tipo-documento";

interface InstructorFormProps {
  defaultValues?: InstructorFormInput;
  onSubmit: (data: InstructorFormOutput) => void;
}

export default function InstructorForm({
  onSubmit,
  defaultValues,
}: InstructorFormProps) {
  const form = useForm<InstructorFormInput, unknown, InstructorFormOutput>({
    resolver: zodResolver(InstructorFormSchema),
    shouldUnregister: true,
    defaultValues: {
      activo: true,
      direccion: "",
      entidad: "",
      password: "",
      passwordCheck: "",
      documento: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      sexo: undefined,
      telefono: "",
      correo_personal: "",
      fecha_expedicion: new Date(),
      fecha_nacimiento: new Date(),
      id_pais: 0,
      id_municipio: 0,
      id_tipo_documento: 0,
      id_modalidad: 0,
      ...defaultValues,
    },
  });

  const { result: tiposDocumento } = useAsyncWithToken(getTiposDocumento, []);
  const { result: paises } = useAsyncWithToken(getPaises, []);
  const { result: municipios } = useAsyncWithToken(getMunicipios, []);
  const { result: modalidades } = useAsyncWithToken(getModalidades, []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  async function handleSubmit(instructor: InstructorFormOutput) {
    try {
      setLoading(true);
      await onSubmit(instructor);
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
            {tiposDocumento && (
              <FormSelect
                control={form.control}
                name="id_tipo_documento"
                items={tiposDocumento}
                itemLabel="siglas"
                itemValue="id"
              />
            )}

            <FormInput control={form.control} name="documento" />
          </div>
        </div>
        <FormSelect
          control={form.control}
          name="sexo"
          items={["Masculino", "Femenino"].map((sexo) => ({
            label: sexo,
            value: sexo.toUpperCase(),
          }))}
          itemLabel="label"
          itemValue="value"
          label="Sexo"
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
        {paises && (
          <FormCombobox
            control={form.control}
            name="id_pais"
            itemLabel="nombre"
            itemValue="id"
            items={paises}
            label="País"
          />
        )}

        {municipios &&
          paises?.find((pais) => pais.id === form.watch("id_pais"))?.codigo ===
            "170" && (
            <FormCombobox
              control={form.control}
              name="id_municipio"
              itemLabel="nombre"
              itemValue="id"
              items={municipios}
              label="Municipio"
            />
          )}

        <FormInput control={form.control} name="telefono" label="Teléfono" />
        <FormInput
          control={form.control}
          name="correo_personal"
          label="Correo personal"
        />

        <FormInput name="direccion" control={form.control} label="Dirección" />

        <FormInput name="entidad" control={form.control} label="Entidad" />

        {modalidades && (
          <FormSelect
            name="id_modalidad"
            control={form.control}
            label="Modalidad"
            items={modalidades}
            itemValue="id"
            itemLabel="nombre"
          />
        )}

        <FormCheckbox control={form.control} name="activo" label="Activo" />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordCheck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetir contraseña</FormLabel>
              <FormControl>
                <InputPassword {...field} />
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
