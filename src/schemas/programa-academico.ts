import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const ProgramaAcademicoSchema = BaseEntitySchema.extend({
  codigo: z.string(),
});

export type ProgramaAcademico = z.infer<typeof ProgramaAcademicoSchema>;
