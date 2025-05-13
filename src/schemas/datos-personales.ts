import { z } from "zod";

import { zodDateFromString, zodStringFromDate } from "@/lib/utils";

import { BaseEntitySchema } from "./generic";
import { MunicipioSchema } from "./municipio";
import { PaisSchema } from "./pais";
import { TipoDocumentoSchema } from "./tipo-documento";

const DatosPersonalesBaseSchema = z.object({
  primer_nombre: z.string(),
  segundo_nombre: z.string(),
  primer_apellido: z.string(),
  segundo_apellido: z.string(),
  documento: z.string(),
  sexo: z.enum(["MASCULINO", "FEMENINO"]),
  telefono: z.string(),
  correo_personal: z.string().email(),
  correo_institucional: z.string().email().optional().nullable(),
  direccion_institucional: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  entidad: z.string().optional().nullable(),
  activo: z.boolean().optional().nullable(),
});

export const DatosPersonalesSchema = DatosPersonalesBaseSchema.extend({
  id: z.number(),
  tipo_documento: TipoDocumentoSchema,
  fecha_expedicion: zodDateFromString(),
  fecha_nacimiento: zodDateFromString(),
  poblacion_especial: BaseEntitySchema.optional().nullable(),
  estado_civil: BaseEntitySchema.optional().nullable(),
  modalidad: BaseEntitySchema.optional().nullable(),
  pais: PaisSchema,
  municipio: MunicipioSchema,
});

export type DatosPersonales = z.infer<typeof DatosPersonalesSchema>;

export const DatosPersonalesFormSchema = DatosPersonalesBaseSchema.extend({
  fecha_expedicion: zodStringFromDate(),
  fecha_nacimiento: zodStringFromDate(),
  id_pais: z.number(),
  id_municipio: z.number().optional(),
  id_poblacion_especial: z.number().optional().nullable(),
  id_estado_civil: z.number().optional().nullable(),
  id_modalidad: z.number().optional().nullable(),
  id_tipo_documento: z.number(),
});

export type DatosPersonalesFormInput = z.input<
  typeof DatosPersonalesFormSchema
>;

export type DatosPersonalesFormOutput = z.infer<
  typeof DatosPersonalesFormSchema
>;

export const UpdatePasswordFormSchema = z
  .object({
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
    id_municipio: entity.municipio.id,
    id_poblacion_especial: entity?.poblacion_especial?.id,
    id_estado_civil: entity?.estado_civil?.id,
    id_modalidad: entity?.modalidad?.id,
    id_tipo_documento: entity.tipo_documento.id,
  };
}
