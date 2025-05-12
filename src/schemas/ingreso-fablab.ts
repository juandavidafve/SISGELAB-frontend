import { z } from "zod";

export const IngresoFablabFormSchema = z.object({
  motivo: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.toUpperCase().replace(/\s/g, "_");
      }
      return val;
    },
    z.enum([
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
    ]),
  ),
  id_oferta_formacion: z.number(),
  id_institucion: z.number(),
  nombre_institucion: z.string(),
  id_programa_academico: z.number(),
  codigo: z.string(),
  id_sala: z.number(),
  materia: z.string(),
  id_semillero: z.number(),
  nombre_semillero: z.string(),
  siglas_semillero: z.string(),
  id_cargo: z.number(),
  asociacion: z.string(),
});

export type IngresoFablabFormInput = z.input<typeof IngresoFablabFormSchema>;

export type IngresoFablabFormOutput = z.infer<typeof IngresoFablabFormSchema>;
