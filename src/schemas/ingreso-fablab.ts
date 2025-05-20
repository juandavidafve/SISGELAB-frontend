import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";

const IngresoFablabBaseSchema = z.object({
  motivo: z.enum([
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
});

export const IngresoFablabSchema = IngresoFablabBaseSchema.extend({
  id: z.number(),
  tiempo: z
    .string()
    .datetime({ local: true })
    .transform((date) => fromZonedTime(date, "America/Bogota")),
  nombre: z.string(),
});

export type IngresoFablab = z.infer<typeof IngresoFablabSchema>;

export const IngresoFablabFormSchema = IngresoFablabBaseSchema.extend({
  id_oferta_formacion: z.number().optional(),
  id_institucion: z.number().nullish(),
  nombre_institucion: z.string().optional(),
  id_programa_academico: z.number().optional(),
  codigo: z.string().optional(),
  id_sala: z.number().optional(),
  materia: z.string().optional(),
  id_semillero: z.number().nullish(),
  nombre_semillero: z.string().optional(),
  siglas_semillero: z.string().optional(),
  id_cargo: z.number().optional(),
  asociacion: z.string().optional(),
});

export type IngresoFablabFormInput = z.input<typeof IngresoFablabFormSchema>;

export type IngresoFablabFormOutput = z.infer<typeof IngresoFablabFormSchema>;

export const motivosMap = new Map<IngresoFablab["motivo"], string>([
  ["CURSO", "Curso"],
  ["CURSO_A_COLEGIO", "Curso a colegio"],
  ["STEAM_SCHOOL", "STEAM School"],
  ["STEAM_YOUNG", "STEAM Young"],
  ["CLASE", "Clase"],
  ["SOCIALIZACION", "Socialización"],
  ["SOCIALIZACION_A_COLEGIO", "Socialización a colegio"],
  ["SEMILLERO", "Semillero"],
  ["GRABACION_CARRERA", "Grabación carrera"],
  ["GRABACION_SEMILLERO", "Grabación semillero"],
  ["GRABACION_EXTERNO", "Grabación externo"],
  ["SUSTENTACION_PROYECTO_GRADO", "Sustentación proyecto de grado"],
  ["PRACTICANTE", "Practicante"],
  ["INFORME_FINAL", "Informe final"],
]);
