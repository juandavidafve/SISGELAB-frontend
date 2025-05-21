import { isPast } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";

import { zodDateFromString, zodStringFromDate } from "@/lib/utils";

import { BaseEntitySchema } from "./generic";
import { MunicipioSchema } from "./municipio";
import { PaisSchema } from "./pais";
import { TipoDocumentoSchema } from "./tipo-documento";

export const DatosPersonalesUserSchema = z.object({
  id: z.number(),
  tipo_documento: TipoDocumentoSchema,
  documento: z.string().nonempty("Se requiere el documento de identidad"),
  fecha_expedicion: zodDateFromString(),
  primer_nombre: z
    .string()
    .nonempty("Se requiere el primer nombre")
    .max(50, "El nombre no puede exceder los 50 carácteres")
    .refine(
      (value) => !/\s/.test(value),
      "El primer nombre no puede tener espacios en blanco",
    ),
  segundo_nombre: z
    .string()
    .max(50, "El segundo nombre no puede exceder los 50 carácteres")
    .optional(),
  primer_apellido: z
    .string()
    .nonempty("Se requiere el primer apellido")
    .max(50, "El apellido no puede exceder los 50 carácteres")
    .refine((value) => {
      if (/^(DA|DE|DEL|DI|DOS|LA|VAN|TER)\s/i.test(value)) return true;

      return !/\s/.test(value);
    }, "El apellido no puede tener espacios en blanco"),

  segundo_apellido: z
    .string()
    .max(50, "El segundo apellido no puede exceder nos 50 carácteres")
    .optional(),
  sexo: z.enum(["MASCULINO", "FEMENINO"], {
    message: "Se requiere el sexo",
  }),
  fecha_nacimiento: zodDateFromString(),
  pais: PaisSchema,
  municipio: MunicipioSchema.optional().nullable(),
  telefono: z
    .string()
    .max(15, "El teléfono no puede exceder los 15 carácteres"),
  correo_personal: z
    .string()
    .email("El correo no es válido")
    .max(200, "El correo no ppuede exceder los 200 carácteres"),
});

export const DatosPersonalesParticipanteSchema =
  DatosPersonalesUserSchema.extend({
    poblacion_especial: BaseEntitySchema.nullish(),
    estado_civil: BaseEntitySchema.nullish(),
    correo_institucional: z.string().email("El correo no es válido").nullish(),
    direccion_institucional: z.string().nullish(),
  });

export const DatosPersonalesInstructorSchema = DatosPersonalesUserSchema.extend(
  {
    direccion: z.string().nonempty("Se requiere la dirección").nullish(),
    entidad: z.string().nullish(),
    modalidad: BaseEntitySchema.nullish(),
    activo: z.boolean().nullish(),
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
  fecha_expedicion: zodStringFromDate()
    .refine(
      (fecha) => isPast(fromZonedTime(fecha, "America/Bogota")),
      "La fecha de expedición no puede estar en el futuro",
    )
    .optional(),
  fecha_nacimiento: zodStringFromDate().refine(
    (fecha) => isPast(fromZonedTime(fecha, "America/Bogota")),
    "La fecha de nacimiento no puede estar en el futuro",
  ),
  id_pais: z.number().min(1, "Se requiere el país"),
  id_municipio: z.number().optional(),
  id_tipo_documento: z.number().min(1, "Se requiere el tipo de documento"),
  id_poblacion_especial: z
    .number()
    .min(1, "Seleccione la población especial")
    .nullish(),
  id_estado_civil: z.number().min(1, "Se requiere el estado civil").optional(),
  id_modalidad: z.number().min(1, "Se requiere la modalidad").nullish(),
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
