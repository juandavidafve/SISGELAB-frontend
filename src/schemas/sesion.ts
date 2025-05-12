import { formatISO } from "date-fns";
import { z } from "zod";

export const SesionFormSchema = z.object({
  fecha: z
    .date()
    .transform((date) => formatISO(date, { representation: "date" })),
  inicio: z.string().time(),
  fin: z.string().time(),
  id_sala: z.number(),
  instructores: z.number().array(),
});

export type SesionFormInput = z.input<typeof SesionFormSchema>;
export type SesionFormOutput = z.infer<typeof SesionFormSchema>;
