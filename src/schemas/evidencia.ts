import { z } from "zod";

import { BaseEntitySchema } from "./generic";
import { InstructorMinimalSchema } from "./instructor";

export const EvidenciaSchema = BaseEntitySchema.extend({
  instructor: InstructorMinimalSchema,
  url: z.string(),
});

export const EvidenciaFormSchema = z.object({
  nombre: z.string().nonempty("Se requiere el nombre de la evidencia"),
  file: z.instanceof(File, {
    message: "Se requiere subir un archivo",
  }),
});

export type Evidencia = z.infer<typeof EvidenciaSchema>;

export type EvidenciaForm = z.infer<typeof EvidenciaFormSchema>;
