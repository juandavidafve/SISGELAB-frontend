import { z } from "zod";

import { BaseEntitySchema } from "./generic";

export const InstructorMinimalSchema = BaseEntitySchema.extend({
  correo: z.string(),
});

export type InstructorMinimal = z.infer<typeof InstructorMinimalSchema>;
