import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const PlantillaCertificadoSchema = BaseEntitySchema.extend({
  url: z.string(),
});

export const PlantillaCertificadoFormSchema = z.object({
  nombre: z.string().nonempty("Se requiere el nombre de la plantilla"),
  file: z.instanceof(File, {
    message: "Se requiere subir un archivo",
  }),
});

export type PlantillaCertificado = z.infer<typeof PlantillaCertificadoSchema>;

export type PlantillaCertificadoForm = z.infer<
  typeof PlantillaCertificadoFormSchema
>;
