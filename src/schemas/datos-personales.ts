import { z } from "zod";

import { zodDateFromString, zodStringFromDate } from "@/lib/utils";

import { BaseEntitySchema } from "./generic";
import { MunicipioSchema } from "./municipio";
import { PaisSchema } from "./pais";
import { TipoDocumentoSchema } from "./tipo-documento";

export const DatosPersonalesUserSchema = z.object({
  id: z.number(),
  tipo_documento: TipoDocumentoSchema,
  documento: z.string(),
  fecha_expedicion: zodDateFromString(),
  primer_nombre: z.string(),
  segundo_nombre: z.string().optional(),
  primer_apellido: z.string(),
  segundo_apellido: z.string().optional(),
  sexo: z.enum(["MASCULINO", "FEMENINO"]),
  fecha_nacimiento: zodDateFromString(),
  pais: PaisSchema,
  municipio: MunicipioSchema.optional(),
  telefono: z.string(),
  correo_personal: z.string().email(),
});

export const DatosPersonalesParticipanteSchema =
  DatosPersonalesUserSchema.extend({
    poblacion_especial: BaseEntitySchema.nullable(),
    estado_civil: BaseEntitySchema.nullable(),
    correo_institucional: z.string().email().nullable(),
    direccion_institucional: z.string().nullable(),
  });

export const DatosPersonalesInstructorSchema = DatosPersonalesUserSchema.extend(
  {
    direccion: z.string().nullable(),
    entidad: z.string().nullable(),
    modalidad: BaseEntitySchema.nullable(),
    activo: z.boolean().nullable(),
  },
);

export const DatosPersonalesSchema = z.object({
  ...DatosPersonalesParticipanteSchema.partial().shape,
  ...DatosPersonalesInstructorSchema.partial().shape,
  ...DatosPersonalesUserSchema.shape,
});

export type DatosPersonales = z.infer<typeof DatosPersonalesSchema>;

export const DatosPersonalesFormSchema = DatosPersonalesSchema.omit({
  id: true,
  pais: true,
  municipio: true,
  poblacion_especial: true,
  estado_civil: true,
  modalidad: true,
  tipo_documento: true,
}).extend({
  fecha_expedicion: zodStringFromDate(),
  fecha_nacimiento: zodStringFromDate(),
  id_pais: z.number(),
  id_municipio: z.number().optional(),
  id_tipo_documento: z.number(),
  id_poblacion_especial: z.number().optional(),
  id_estado_civil: z.number().optional(),
  id_modalidad: z.number().optional(),
});

export type DatosPersonalesFormInput = z.input<
  typeof DatosPersonalesFormSchema
>;

export type DatosPersonalesFormOutput = z.infer<
  typeof DatosPersonalesFormSchema
>;

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().optional(),
    password: z.string().nonempty("La contraseña no debe estar vacía"),
    passwordCheck: z.string().nonempty("Debes confirmar la contraseña"),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "Las contraseñas no coinciden",
    path: ["passwordCheck"],
  });

export type UpdatePassword = z.infer<typeof UpdatePasswordFormSchema>;

export function convertToFormInput(
  entity: DatosPersonales,
): DatosPersonalesFormInput {
  return {
    ...entity,
    id_pais: entity.pais.id,
    id_municipio: entity.municipio?.id,
    id_poblacion_especial: entity.poblacion_especial?.id,
    id_estado_civil: entity.estado_civil?.id,
    id_modalidad: entity.modalidad?.id,
    id_tipo_documento: entity.tipo_documento.id,
  };
}
