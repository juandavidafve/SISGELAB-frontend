import { z } from "zod";

import {
  DatosPersonalesFormSchema,
  DatosPersonalesInstructorSchema,
} from "./datos-personales";
import { BaseEntitySchema } from "./generic";

export const InstructorMinimalSchema = BaseEntitySchema.extend({
  correo: z.string(),
  activo: z.boolean(),
});

export type InstructorMinimal = z.infer<typeof InstructorMinimalSchema>;

export const InstructorSchema = DatosPersonalesInstructorSchema;
export type Instructor = z.infer<typeof InstructorSchema>;

export const InstructorFormSchema = DatosPersonalesFormSchema.omit({
  id_poblacion_especial: true,
  id_estado_civil: true,
  correo_institucional: true,
  direccion_institucional: true,
})
  .extend({
    password: z.string().optional(),
    passwordCheck: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "Las contraseñas no coinciden",
    path: ["passwordCheck"],
  });

export type InstructorFormInput = z.input<typeof InstructorFormSchema>;
export type InstructorFormOutput = z.infer<typeof InstructorFormSchema>;

export function convertToFormInput(entity: Instructor): InstructorFormInput {
  return {
    ...entity,
    id_pais: entity.pais.id,
    id_municipio: entity.municipio?.id,
    id_tipo_documento: entity.tipo_documento.id,
    id_modalidad: entity.modalidad?.id,
  };
}
