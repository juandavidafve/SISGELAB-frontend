import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";

const IngresoFablabBaseSchema = z.object({
  motivo: z.enum(
    [
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
    ],
    {
      message: "Se requiere el motivo",
    },
  ),
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
  id_oferta_formacion: z
    .number()
    .min(1, "Se requiere la oferta de formación")
    .nullish(),
  id_institucion: z.number().min(1, "Se requiere la institución").nullish(),
  nombre_institucion: z
    .string()
    .nonempty("Se requiere el nombre de la institución")
    .nullish(),
  id_programa_academico: z
    .number()
    .min(1, "Se requiere el programa académico")
    .nullish(),
  codigo: z.string().nonempty("Se requiere el código").nullish(),
  id_sala: z.number().min(1, "Se requiere la sala").nullish(),
  materia: z.string().nonempty("Se requiere el nombre de la materia").nullish(),
  id_semillero: z.number().min(1, "Se requiere el semillero").nullish(),
  nombre_semillero: z
    .string()
    .min(1, "Se requiere el nombre del semillero")
    .nullish(),
  siglas_semillero: z.string().nullish(),
  id_cargo: z.number().min(1, "Se requiere el cargo").nullish(),
  asociacion: z
    .string()
    .nonempty("Se requiere el nombre de la asociación")
    .nullish(),
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
