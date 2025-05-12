import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const SemilleroSchema = BaseEntitySchema.extend({
  siglas: z.string(),
});

export type Semillero = z.infer<typeof SemilleroSchema>;
