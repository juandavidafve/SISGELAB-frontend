import { z } from "zod";

import { makeAllFieldsNullable } from "@/lib/utils";

import {
  DatosPersonalesFormSchema,
  DatosPersonalesParticipanteSchema,
} from "./datos-personales";

export const ParticipanteMinimalSchema = makeAllFieldsNullable(
  DatosPersonalesParticipanteSchema.pick({
    id: true,
    documento: true,
    correo_personal: true,
    correo_institucional: true,
  }).extend({
    nombre: z.string(),
  }),
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
