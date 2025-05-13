import { formatISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";

import { BaseEntitySchema } from "./generic";
import { InstructorMinimalSchema } from "./instructor";

export const SesionSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  fecha: z
    .string()
    .date()
    .transform((date) => fromZonedTime(date, "America/Bogota")),
  inicio: z.string().time(),
  fin: z.string().time(),
  sala: BaseEntitySchema,
  instructores: InstructorMinimalSchema.array(),
  participantes: BaseEntitySchema.array(),
  evidencias: BaseEntitySchema.array(),
});

export type Sesion = z.infer<typeof SesionSchema>;

export const SesionMinimalSchema = SesionSchema.pick({
  id: true,
  nombre: true,
  fecha: true,
  inicio: true,
  fin: true,
  sala: true,
  instructores: true,
});

export type SesionMinimal = z.infer<typeof SesionMinimalSchema>;

export const SesionFormSchema = z.object({
  id: z.number().optional(),
  fecha: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  inicio: z.string().time(),
  fin: z.string().time(),
  id_sala: z.number(),
  instructores: z.number().array(),
});

export type SesionFormInput = z.input<typeof SesionFormSchema>;
export type SesionFormOutput = z.infer<typeof SesionFormSchema>;

export function convertSesionToFormInput(
  entity: SesionMinimal,
): SesionFormInput {
  return {
    ...entity,
    id_sala: entity.sala.id,
    instructores: entity.instructores.map((instructor) => instructor.id),
  };
}
