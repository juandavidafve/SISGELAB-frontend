import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormInputDate from "@/components/ui/form-input-date";
import FormSelect from "@/components/ui/form-select";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  ParticipanteFormInput,
  ParticipanteFormOutput,
  ParticipanteFormSchema,
} from "@/schemas/participante";
import { getAll as getEstadosCiviles } from "@/services/estado-civil";
import { getAll as getMunicipios } from "@/services/municipio";
import { getAll as getPaises } from "@/services/pais";
import { getAll as getPoblacionesEspeciales } from "@/services/poblacion-especial";
import { getAll as getTiposDocumento } from "@/services/tipo-documento";

interface Props {
  onSubmit: (participante: ParticipanteFormOutput) => void;
}

export default function ParticipanteForm({ onSubmit }: Props) {
  const form = useForm<ParticipanteFormInput, unknown, ParticipanteFormOutput>({
    resolver: zodResolver(ParticipanteFormSchema),
    defaultValues: {
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      correo_institucional: "",
      correo_personal: "",
      direccion_institucional: "",
      id_pais: 0,
      documento: "",
      fecha_expedicion: new Date(),
      fecha_nacimiento: new Date(),
      id_estado_civil: 0,
      id_municipio: 0,
      id_poblacion_especial: 0,
      id_tipo_documento: 0,
      sexo: undefined,
    },
  });

  const { result: tiposDocumento } = useAsyncWithToken(getTiposDocumento, []);
  const { result: paises } = useAsyncWithToken(getPaises, []);
  const { result: municipios } = useAsyncWithToken(getMunicipios, []);
  const { result: poblacionesEspeciales } = useAsyncWithToken(
    getPoblacionesEspeciales,
    [],
  );
  const { result: estadosCiviles } = useAsyncWithToken(getEstadosCiviles, []);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(participante: ParticipanteFormOutput) {
    try {
      setLoading(true);
      await onSubmit(participante);
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
        {tiposDocumento?.find((tipoDocumento) => tipoDocumento.siglas === "CC")
          ?.id === form.watch("id_tipo_documento") && (
          <FormInputDate
            control={form.control}
            name="fecha_expedicion"
            label="Fecha de expedición"
          />
        )}

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
          items={poblacionesEspeciales || []}
          itemLabel="nombre"
          itemValue="id"
          label="Población especial"
        />

        <FormSelect
          control={form.control}
          name="id_estado_civil"
          items={estadosCiviles || []}
          itemLabel="nombre"
          itemValue="id"
          label="Estado civil"
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
