import { z } from "zod";

export const BaseEntitySchema = z.object({
  id: z.number(),
  nombre: z.string(),
});
