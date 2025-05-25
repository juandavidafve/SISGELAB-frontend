import { z } from "zod";

import { zodDateFromString, zodStringFromDate } from "@/lib/utils";

import { BaseEntitySchema } from "./generic";
import { InstitucionSchema } from "./institucion";
import {
  convertSesionToFormInput,
  SesionFormInput,
  SesionFormSchema,
  SesionMinimalSchema,
} from "./sesion";

const OfertaFormacionBaseSchema = z.object({
  nombre: z
    .string()
    .nonempty("Se requiere el nombre de la oferta")
    .max(200, "El nombre de la oferta no puede exceder los 200 carácteres"),
  codigo: z
    .string()
    .nonempty("Se requiere el código de la oferta")
    .max(20, "El código de la oferta no puede exceder los 20 carácteres"),
  cine: z
    .number()
    .min(1, "El código cine debe tener al menos un dígito")
    .max(9999, "El código cine debe tener como máximo cuatro dígitos"),
  extension: z.boolean(),
  horas: z
    .number()
    .min(1, "La oferta de formación debe durar al menos una hora"),
  semestre: z
    .number()
    .min(1, "El semestre solo puede ser 1 o 2")
    .max(2, "El semestre solo puede ser 1 o 2"),
  valor: z.number().nonnegative("El valor no puede ser negativo"),
  cupo_maximo: z.number().min(1, "El cupo debe ser de al menos 1"),
});

export const OfertaFormacionSchema = OfertaFormacionBaseSchema.extend({
  id: z.number(),
  estado: z.enum(["ACTIVA", "INACTIVA", "FINALIZADA"]),
  pieza_grafica: z.string(),
  tipo_oferta: BaseEntitySchema,
  categoria: BaseEntitySchema,
  tipos_beneficiario: BaseEntitySchema.array(),
  fecha_inicio: zodDateFromString(),
  fecha_fin: zodDateFromString(),
  instituciones: InstitucionSchema.array(),
  sesiones: SesionMinimalSchema.array().nonempty(),
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
  fecha_inicio: zodStringFromDate(),
  fecha_fin: zodStringFromDate(),
  id_tipo: z.number().min(1, "Se requiere seleccionar el tipo de oferta"),
  id_categoria: z.number(),
  tipos_beneficiario: z
    .number()
    .array()
    .nonempty("Se debe seleccionar al menos un tipo de beneficiario"),
  instituciones: z.number().array(),
  sesiones: SesionFormSchema.array().nonempty(
    "Se debe crear al menos una sesión",
  ),
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
    tipos_beneficiario: entity.tipos_beneficiario.map((e) => e.id) as [
      number,
      ...number[],
    ],
    instituciones: entity.instituciones.map((e) => e.id),
    sesiones: entity.sesiones.map((sesion) =>
      convertSesionToFormInput(sesion),
    ) as [SesionFormInput, ...SesionFormInput[]],
  };
}
