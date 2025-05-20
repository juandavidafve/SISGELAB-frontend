import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ReactNode, useState } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { handleAxiosError } from "@/lib/error";
import {
  IngresoFablabFormInput,
  IngresoFablabFormOutput,
  IngresoFablabFormSchema,
  motivosMap,
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
    shouldUnregister: true,
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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: IngresoFablabFormOutput) {
    try {
      setLoading(true);
      await createIngreso(data);
      toast.success("Ingreso registrado exitosamente");
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

  type FormNode<
    T extends Path<IngresoFablabFormInput> = Path<IngresoFablabFormInput>,
  > = {
    field: T;
    elem: ReactNode;
    next?: (
      value: PathValue<IngresoFablabFormInput, T>,
    ) => FormNode | undefined;
  };

  const formNodes = new Map<string, FormNode>();

  formNodes.set("motivo", {
    field: "motivo",
    elem: (
      <FormCombobox
        name="motivo"
        control={form.control}
        label="Motivo"
        items={Array.from(motivosMap).map((item) => ({
          value: item[0],
          label: item[1],
        }))}
        itemLabel="label"
        itemValue="value"
      />
    ),
    next: (value) => {
      if (value === "CURSO") return formNodes.get("id_oferta_formacion");
      if (value === "CURSO_A_COLEGIO")
        return formNodes.get("id_oferta_formacion_colegios");
      if (value === "STEAM_SCHOOL" || value === "STEAM_YOUNG")
        return formNodes.get("id_institucion_colegios");
      if (value === "CLASE") return formNodes.get("id_sala");
      if (value === "SOCIALIZACION") return formNodes.get("id_institucion");
      if (value === "SOCIALIZACION_A_COLEGIO")
        return formNodes.get("id_institucion_colegios");
      if (value === "SEMILLERO") return formNodes.get("id_semillero");
      if (value === "GRABACION_CARRERA") return formNodes.get("id_institucion");
      if (value === "GRABACION_SEMILLERO") return formNodes.get("id_semillero");
      if (value === "GRABACION_EXTERNO") return formNodes.get("asociacion");
      if (value === "SUSTENTACION_PROYECTO_GRADO") return;
      if (value === "PRACTICANTE") return formNodes.get("id_institucion");
      if (value === "INFORME_FINAL") return formNodes.get("id_cargo");
    },
  });

  formNodes.set("asociacion", {
    field: "asociacion",
    elem: (
      <FormInput name="asociacion" control={form.control} label="Asociación" />
    ),
    next: () => {
      return formNodes.get("id_institucion");
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
    next: () => formNodes.get("id_institucion"),
  });

  formNodes.set("id_oferta_formacion_colegios", {
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
    next: () => formNodes.get("id_institucion_colegios"),
  });

  formNodes.set("id_institucion_colegios", {
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
    next: () => formNodes.get("id_cargo"),
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
    next: () => formNodes.get("nombre_institucion"),
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
    next: () => formNodes.get("id_programa_academico"),
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
    next: () => formNodes.get("codigo"),
  });

  formNodes.set("codigo", {
    field: "codigo",
    elem: <FormInput name="codigo" control={form.control} label="Código" />,
    next: () => formNodes.get("id_cargo"),
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
    next: () => formNodes.get("materia"),
  });

  formNodes.set("materia", {
    field: "materia",
    elem: <FormInput name="materia" control={form.control} label="Materia" />,
    next: () => formNodes.get("id_institucion"),
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
    next: () => formNodes.get("nombre_semillero"),
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
    next: () => formNodes.get("siglas_semillero"),
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
    next: () => formNodes.get("id_institucion"),
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
        {getNodeList().map((item) => (
          <div key={item?.field}>{item?.elem}</div>
        ))}

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
