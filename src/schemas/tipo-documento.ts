import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const TipoDocumentoSchema = BaseEntitySchema.extend({
  siglas: z.string(),
});

export type TipoDocumento = z.infer<typeof TipoDocumentoSchema>;
