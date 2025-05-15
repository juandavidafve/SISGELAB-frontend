import { z } from "zod";

import { zodStringFromDate } from "@/lib/utils";

import { DatosPersonalesInstructorSchema } from "./datos-personales";
import { BaseEntitySchema } from "./generic";

export const InstructorMinimalSchema = BaseEntitySchema.extend({
  correo: z.string(),
});

export type InstructorMinimal = z.infer<typeof InstructorMinimalSchema>;

export const InstructorSchema = DatosPersonalesInstructorSchema;
export type Instructor = z.infer<typeof InstructorSchema>;

export const InstructorFormSchema = InstructorSchema.omit({
  pais: true,
  municipio: true,
  modalidad: true,
  tipo_documento: true,
})
  .extend({
    fecha_expedicion: zodStringFromDate(),
    fecha_nacimiento: zodStringFromDate(),
    id_pais: z.number(),
    id_municipio: z.number().optional(),
    id_tipo_documento: z.number(),
    id_modalidad: z.number(),
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
    id_municipio: entity.municipio.id,
    id_tipo_documento: entity.tipo_documento.id,
    id_modalidad: entity.modalidad.id,
  };
}
