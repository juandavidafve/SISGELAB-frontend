import { z } from "zod";

export const IngresoFablabFormSchema = z.object({
  motivo: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.toUpperCase().replace(/\s/g, "_");
      }
      return val;
    },
    z
      .enum([
        "CURSO",
        "CURSO_A_COLEGIO",
        "STEAM_SCHOOL",
        "STEAM_YOUNG",
        "CLASE",
        "SOCIALIZACION",
        "SOCIALIZACION_A_COLEGIO",
        "SEMILLERO",
        "GRABACION_CARRERA",
        "GRABACION_SEMILLERO",
        "GRABACION_EXTERNO",
        "SUSTENTACION_PROYECTO_GRADO",
        "PRACTICANTE",
        "INFORME_FINAL",
      ])
      .optional(),
  ),
  id_oferta_formacion: z.number().optional(),
  id_institucion: z.number().optional(),
  nombre_institucion: z.string().optional(),
  id_programa_academico: z.number().optional(),
  codigo: z.string().optional(),
  id_sala: z.number().optional(),
  materia: z.string().optional(),
  id_semillero: z.number().optional(),
  nombre_semillero: z.string().optional(),
  siglas_semillero: z.string().optional(),
  id_cargo: z.number().optional(),
  asociacion: z.string().optional(),
});

export type IngresoFablabFormInput = z.input<typeof IngresoFablabFormSchema>;

export type IngresoFablabFormOutput = z.infer<typeof IngresoFablabFormSchema>;
