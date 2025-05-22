import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const PlantillaCertificadoSchema = BaseEntitySchema.extend({
  url: z.string(),
});

export const PlantillaCertificadoFormSchema = z.object({
  nombre: z.string(),
  file: z.instanceof(File),
});

export type PlantillaCertificado = z.infer<typeof PlantillaCertificadoSchema>;

export type PlantillaCertificadoForm = z.infer<
  typeof PlantillaCertificadoFormSchema
>;
