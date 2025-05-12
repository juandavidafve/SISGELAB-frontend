import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const InstitucionSchema = BaseEntitySchema.extend({
  tipoInstitucion: z.string(),
});

export type Institucion = z.infer<typeof InstitucionSchema>;
