import { z } from "zod";

export const ErrorSchema = z.object({
  error: z.boolean(),
  messages: z.string().array(),
});
