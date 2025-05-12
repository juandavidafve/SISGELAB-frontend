import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const MunicipioSchema = BaseEntitySchema.extend({
  codigo: z.string(),
});

export type Municipio = z.infer<typeof MunicipioSchema>;
