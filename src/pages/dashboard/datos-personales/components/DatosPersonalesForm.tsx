import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormInputDate from "@/components/ui/form-input-date";
import FormSelect from "@/components/ui/form-select";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import useAuth from "@/hooks/useAuth";
import { handleAxiosError } from "@/lib/error";
import {
  DatosPersonalesFormInput,
  DatosPersonalesFormOutput,
  DatosPersonalesFormSchema,
} from "@/schemas/datos-personales";
import { getAll as getEstadosCiviles } from "@/services/estado-civil";
import { getAll as getModalidades } from "@/services/modalidad";
import { getAll as getMunicipios } from "@/services/municipio";
import { getAll as getPaises } from "@/services/pais";
import { getAll as getPoblacionesEspeciales } from "@/services/poblacion-especial";
import { getAll as getTiposDocumento } from "@/services/tipo-documento";

interface DatosPersonalesFormProps {
  defaultValues?: DatosPersonalesFormInput;
  onSubmit: (data: DatosPersonalesFormOutput) => void;
}

export default function DatosPersonalesForm({
  onSubmit,
  defaultValues,
}: DatosPersonalesFormProps) {
  const { info } = useAuth();
  const form = useForm<
    DatosPersonalesFormInput,
    unknown,
    DatosPersonalesFormOutput
  >({
    resolver: zodResolver(DatosPersonalesFormSchema),
    shouldUnregister: true,
    defaultValues,
  });

  const { result: tiposDocumento } = useAsyncWithToken(getTiposDocumento, []);
  const { result: paises } = useAsyncWithToken(getPaises, []);
  const { result: municipios } = useAsyncWithToken(getMunicipios, []);
  const { result: poblacionesEspeciales } = useAsyncWithToken(
    getPoblacionesEspeciales,
    [],
  );
  const { result: estadosCiviles } = useAsyncWithToken(getEstadosCiviles, []);
  const { result: modalidades } = useAsyncWithToken(getModalidades, []);

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
        {info?.roles.includes("ROLE_PARTICIPANTE") && (
          <FormInput
            control={form.control}
            name="correo_institucional"
            label="Correo institucional"
          />
        )}
        {info?.roles.includes("ROLE_PARTICIPANTE") && (
          <FormInput
            control={form.control}
            name="direccion_institucional"
            label="Dirección institucional"
          />
        )}
        {poblacionesEspeciales && info?.roles.includes("ROLE_PARTICIPANTE") && (
          <FormSelect
            control={form.control}
            name="id_poblacion_especial"
            items={poblacionesEspeciales}
            itemLabel="nombre"
            itemValue="id"
            label="Población especial"
          />
        )}
        {estadosCiviles && info?.roles.includes("ROLE_PARTICIPANTE") && (
          <FormSelect
            control={form.control}
            name="id_estado_civil"
            items={estadosCiviles}
            itemLabel="nombre"
            itemValue="id"
            label="Estado civil"
          />
        )}

        {info?.roles.includes("ROLE_INSTRUCTOR") && (
          <FormInput
            name="direccion"
            control={form.control}
            label="Dirección"
          />
        )}

        {info?.roles.includes("ROLE_INSTRUCTOR") && (
          <FormInput name="entidad" control={form.control} label="Entidad" />
        )}

        {modalidades && info?.roles.includes("ROLE_INSTRUCTOR") && (
          <FormSelect
            name="id_modalidad"
            control={form.control}
            label="Modalidad"
            items={modalidades}
            itemValue="id"
            itemLabel="nombre"
          />
        )}

        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
