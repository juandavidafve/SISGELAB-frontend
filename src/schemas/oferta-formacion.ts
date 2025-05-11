import { formatISO } from "date-fns";
import { z } from "zod";

import { BaseEntity } from "./generic";
import { SesionFormSchema } from "./sesion";

const OfertaFormacionBaseSchema = z.object({
  nombre: z.string(),
  codigo: z.string(),
  cine: z.string(),
  extension: z.boolean(),
  horas: z.number(),
  semestre: z.number(),
  valor: z.number(),
});

export const OfertaFormacionSchema = OfertaFormacionBaseSchema.extend({
  id: z.number(),
  estado: z.enum(["ACTIVA", "INACTIVA", "FINALIZADA"]),
  pieza_grafica: z.string(),
  tipo_oferta: BaseEntity,
  categoria: BaseEntity,
  tipo_beneficiario: BaseEntity,
  fecha_inicio: z.string().date(),
  fecha_fin: z.string().date(),
  institucion: BaseEntity.extend({
    tipoInstitucion: z.string(),
  }),
  sesiones: z
    .object({
      id: z.number(),
      nombre: z.string(),
      fecha: z.string(),
      inicio: z.string(),
      fin: z.string(),
      sala: BaseEntity,
    })
    .array(),
  inscritos: BaseEntity.array(),
});

export const OfertaFormacionMinimalSchema = OfertaFormacionSchema.pick({
  id: true,
  nombre: true,
  estado: true,
});

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
  cupo_maximo: z.number(),
  id_institucion: z.number(),
  sesiones: SesionFormSchema.array(),
});

export type OfertaFormacionFormInput = z.input<
  typeof OfertaFormacionFormSchema
>;

export type OfertaFormacionFormOutput = z.infer<
  typeof OfertaFormacionFormSchema
>;
