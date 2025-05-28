import { z } from "zod";

import { makeAllFieldsNullable } from "@/lib/utils";

import {
  DatosPersonalesFormSchema,
  DatosPersonalesParticipanteSchema,
} from "./datos-personales";

export const ParticipanteMinimalSchema = z
  .object({
    id: z.number(),
    nombre: z.string().nullable(),
  })
  .merge(
    makeAllFieldsNullable(
      DatosPersonalesParticipanteSchema.pick({
        documento: true,
        correo_personal: true,
        correo_institucional: true,
      }),
    ),
  );

export type ParticipanteMinimal = z.infer<typeof ParticipanteMinimalSchema>;

export const ParticipanteSchema = DatosPersonalesParticipanteSchema;
export type Participante = z.infer<typeof ParticipanteSchema>;

export const ParticipanteFormSchema = DatosPersonalesFormSchema.omit({
  direccion: true,
  entidad: true,
  id_modalidad: true,
  activo: true,
});

export type ParticipanteFormInput = z.input<typeof ParticipanteFormSchema>;
export type ParticipanteFormOutput = z.output<typeof ParticipanteFormSchema>;
