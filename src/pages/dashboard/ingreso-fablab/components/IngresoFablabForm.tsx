import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  IngresoFablabFormInput,
  IngresoFablabFormOutput,
  IngresoFablabFormSchema,
} from "@/schemas/ingreso-fablab";
import { getAll as getCargos } from "@/services/cargo";
import { create as createIngreso } from "@/services/ingreso-fablab";
import { getAll as getInstituciones } from "@/services/institucion";
import { getAll as getOfertasFormacion } from "@/services/oferta-formacion";
import { getAll as getProgramasAcademicos } from "@/services/programa-academico";
import { getAll as getSalas } from "@/services/sala";
import { getAll as getSemilleros } from "@/services/semillero";

export default function IngresoFablabForm() {
  const form = useForm<
    IngresoFablabFormInput,
    unknown,
    IngresoFablabFormOutput
  >({
    resolver: zodResolver(IngresoFablabFormSchema),
    defaultValues: {
      motivo: "",
      id_oferta_formacion: undefined,
      id_institucion: undefined,
      nombre_institucion: "",
      id_programa_academico: undefined,
      codigo: "",
      id_sala: undefined,
      materia: "",
      id_semillero: undefined,
      nombre_semillero: "",
      siglas_semillero: "",
      id_cargo: undefined,
      asociacion: "",
    },
  });

  const { result: ofertasFormacion } = useAsyncWithToken(
    getOfertasFormacion,
    [],
  );
  const { result: instituciones } = useAsyncWithToken(getInstituciones, []);
  const { result: programasAcademicos } = useAsyncWithToken(
    getProgramasAcademicos,
    [],
  );
  const { result: salas } = useAsyncWithToken(getSalas, []);
  const { result: semilleros } = useAsyncWithToken(getSemilleros, []);
  const { result: cargos } = useAsyncWithToken(getCargos, []);

  async function handleSubmit(data: IngresoFablabFormOutput) {
    try {
      await createIngreso(data);
      toast.success("Ingreso registrado exitosamente");
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    }
  }

  type FormNode<
    T extends Path<IngresoFablabFormInput> = Path<IngresoFablabFormInput>,
  > = {
    field: T;
    elem: ReactNode;
    next?: (
      value: PathValue<IngresoFablabFormInput, T>,
    ) => FormNode | undefined;
  };

  const formNodes = new Map<Path<IngresoFablabFormInput>, FormNode>();

  formNodes.set("motivo", {
    field: "motivo",
    elem: (
      <FormCombobox
        name="motivo"
        control={form.control}
        label="Motivo"
        items={[
          { value: "CURSO", label: "Curso" },
          { value: "CURSO_A_COLEGIO", label: "Curso a colegio" },
          { value: "STEAM_SCHOOL", label: "Steam school" },
          { value: "STEAM_YOUNG", label: "Steam young" },
          { value: "CLASE", label: "Clase" },
          { value: "SOCIALIZACION", label: "Socialización" },
          {
            value: "SOCIALIZACION_A_COLEGIO",
            label: "Socialización a colegio",
          },
          { value: "SEMILLERO", label: "Semillero" },
          { value: "GRABACION_CARRERA", label: "Grabación carrera" },
          { value: "GRABACION_SEMILLERO", label: "Grabación semillero" },
          { value: "GRABACION_EXTERNO", label: "Grabación externo" },
          {
            value: "SUSTENTACION_PROYECTO_GRADO",
            label: "Sustentación proyecto de grado",
          },
          { value: "PRACTICANTE", label: "Practicante" },
          { value: "INFORME_FINAL", label: "Informe final" },
        ]}
        itemLabel="label"
        itemValue="value"
      />
    ),
    next: (value) => {
      if (value === "CURSO") return formNodes.get("id_oferta_formacion");
      if (value === "CURSO_A_COLEGIO")
        return formNodes.get("id_oferta_formacion");

      return formNodes.get("id_programa_academico");
    },
  });

  formNodes.set("id_oferta_formacion", {
    field: "id_oferta_formacion",
    elem: ofertasFormacion && (
      <FormCombobox
        name="id_oferta_formacion"
        control={form.control}
        label="Oferta de Formación"
        items={ofertasFormacion}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("id_institucion", {
    field: "id_institucion",
    elem: instituciones && (
      <FormCombobox
        name="id_institucion"
        control={form.control}
        label="Institución"
        items={instituciones}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("nombre_institucion", {
    field: "nombre_institucion",
    elem: (
      <FormInput
        name="nombre_institucion"
        control={form.control}
        label="Nombre de Institución"
      />
    ),
  });

  formNodes.set("id_programa_academico", {
    field: "id_programa_academico",
    elem: programasAcademicos && (
      <FormCombobox
        name="id_programa_academico"
        control={form.control}
        label="Programa Académico"
        items={programasAcademicos}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("codigo", {
    field: "codigo",
    elem: <FormInput name="codigo" control={form.control} label="Código" />,
  });

  formNodes.set("id_sala", {
    field: "id_sala",
    elem: salas && (
      <FormCombobox
        name="id_sala"
        control={form.control}
        label="Sala"
        items={salas}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("materia", {
    field: "materia",
    elem: <FormInput name="materia" control={form.control} label="Materia" />,
  });

  formNodes.set("id_semillero", {
    field: "id_semillero",
    elem: semilleros && (
      <FormCombobox
        name="id_semillero"
        control={form.control}
        label="Semillero"
        items={semilleros}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("nombre_semillero", {
    field: "nombre_semillero",
    elem: (
      <FormInput
        name="nombre_semillero"
        control={form.control}
        label="Nombre del Semillero"
      />
    ),
  });

  formNodes.set("siglas_semillero", {
    field: "siglas_semillero",
    elem: (
      <FormInput
        name="siglas_semillero"
        control={form.control}
        label="Siglas del Semillero"
      />
    ),
  });

  formNodes.set("id_cargo", {
    field: "id_cargo",
    elem: cargos && (
      <FormSelect
        name="id_cargo"
        control={form.control}
        label="Cargo"
        items={cargos}
        itemValue="id"
        itemLabel="nombre"
      />
    ),
  });

  formNodes.set("asociacion", {
    field: "asociacion",
    elem: (
      <FormInput name="asociacion" control={form.control} label="Asociación" />
    ),
  });

  function getNodeList() {
    let currentFormNode = formNodes.get("motivo");
    let next = undefined;
    const list = [currentFormNode];
    do {
      next =
        currentFormNode &&
        currentFormNode.next &&
        currentFormNode.next(form.watch(currentFormNode.field));

      if (next) {
        currentFormNode = next;
        list.push(next);
      }
    } while (next);

    return list;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        {getNodeList().map((item) => item?.elem)}

        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
