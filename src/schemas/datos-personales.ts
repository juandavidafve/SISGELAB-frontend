import { formatISO } from "date-fns";
import { z } from "zod";

export const DatosPersonalesFormSchema = z.object({
  primer_nombre: z.string(),
  segundo_nombre: z.string(),
  primer_apellido: z.string(),
  segundo_apellido: z.string(),
  id_tipo_documento: z.number(),
  documento: z.string(),
  fecha_expedicion: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  sexo: z.enum(["MASCULINO", "FEMENINO"]),
  fecha_nacimiento: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  id_pais: z.number(),
  id_municipio: z.number(),
  telefono: z.string(),
  correo_personal: z.string().email(),
  correo_institucional: z.string().email(),
  direccion_institucional: z.string(),
  id_poblacion_especial: z.number(),
  id_estado_civil: z.number(),
  direccion: z.string(),
  entidad: z.string(),
  id_modalidad: z.number(),
});

export type DatosPersonalesFormInput = z.input<
  typeof DatosPersonalesFormSchema
>;

export type DatosPersonalesFormOutput = z.infer<
  typeof DatosPersonalesFormSchema
>;
