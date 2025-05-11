import { z } from "zod";

import { BaseEntity } from "./generic";

const EstadoOfertaFormacionSchema = z.enum([
  "ACTIVA",
  "INACTIVA",
  "FINALIZADA",
]);

export const OfertaFormacionMinimalSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  estado: EstadoOfertaFormacionSchema,
});

export type OfertaFormacionMinimal = z.infer<
  typeof OfertaFormacionMinimalSchema
>;

const InstitucionSchema = BaseEntity.extend({
  tipoInstitucion: z.string(),
});

const SesionSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  fecha: z.string(),
  inicio: z.string(),
  fin: z.string(),
  sala: BaseEntity,
});

export const OfertaFormacionSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  codigo: z.string(),
  cine: z.string(),
  extension: z.boolean(),
  estado: EstadoOfertaFormacionSchema,
  fecha_inicio: z.string(),
  fecha_fin: z.string(),
  horas: z.number(),
  tipo_oferta: BaseEntity,
  categoria: BaseEntity,
  tipo_beneficiario: BaseEntity,
  semestre: z.number(),
  valor: z.number(),
  pieza_grafica: z.string(),
  institucion: InstitucionSchema,
  sesiones: z.array(SesionSchema),
  inscritos: z.array(BaseEntity),
});

export type OfertaFormacion = z.infer<typeof OfertaFormacionSchema>;
