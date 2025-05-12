import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const PaisSchema = BaseEntitySchema.extend({
  codigo: z.string(),
});

export type Pais = z.infer<typeof PaisSchema>;
