import { formatISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";

import { BaseEntitySchema } from "./generic";
import { InstitucionSchema } from "./institucion";
import {
  convertSesionToFormInput,
  SesionFormSchema,
  SesionMinimalSchema,
} from "./sesion";

const OfertaFormacionBaseSchema = z.object({
  nombre: z.string(),
  codigo: z.string(),
  cine: z.number().min(0).max(9999),
  extension: z.boolean(),
  horas: z.number(),
  semestre: z.number(),
  valor: z.number(),
  cupo_maximo: z.number(),
});

export const OfertaFormacionSchema = OfertaFormacionBaseSchema.extend({
  id: z.number(),
  estado: z.enum(["ACTIVA", "INACTIVA", "FINALIZADA"]),
  pieza_grafica: z.string(),
  tipo_oferta: BaseEntitySchema,
  categoria: BaseEntitySchema,
  tipo_beneficiario: BaseEntitySchema,
  fecha_inicio: z
    .string()
    .date()
    .transform((date) => fromZonedTime(date, "America/Bogota")),
  fecha_fin: z
    .string()
    .date()
    .transform((date) => fromZonedTime(date, "America/Bogota")),
  institucion: InstitucionSchema,
  sesiones: SesionMinimalSchema.array(),
  inscritos: BaseEntitySchema.array(),
});

export type OfertaFormacion = z.infer<typeof OfertaFormacionSchema>;

export const OfertaFormacionMinimalSchema = OfertaFormacionSchema.pick({
  id: true,
  nombre: true,
  estado: true,
  categoria: true,
});

export type OfertaFormacionMinimal = z.infer<
  typeof OfertaFormacionMinimalSchema
>;

export const OfertaFormacionFormSchema = OfertaFormacionBaseSchema.extend({
  fecha_inicio: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  fecha_fin: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  id_tipo: z.number(),
  id_categoria: z.number(),
  id_tipo_beneficiario: z.number(),
  id_institucion: z.number(),
  sesiones: SesionFormSchema.array(),
  file: z.instanceof(File).optional(),
});

export type OfertaFormacionFormInput = z.input<
  typeof OfertaFormacionFormSchema
>;

export type OfertaFormacionFormOutput = z.infer<
  typeof OfertaFormacionFormSchema
>;

export function convertToFormInput(
  entity: OfertaFormacion,
): OfertaFormacionFormInput {
  return {
    ...entity,
    id_tipo: entity.tipo_oferta.id,
    id_categoria: entity.categoria.id,
    id_tipo_beneficiario: entity.tipo_beneficiario.id,
    id_institucion: entity.tipo_beneficiario.id,
    sesiones: entity.sesiones.map((sesion) => convertSesionToFormInput(sesion)),
  };
}
