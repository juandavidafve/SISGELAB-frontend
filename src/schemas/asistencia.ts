import { z } from "zod";

import { ParticipanteMinimalSchema } from "./participante";

export const AsistenciaSchema = z.object({
  id: z.number(),
  participante: ParticipanteMinimalSchema,
  asistio: z.boolean(),
});

export type Asistencia = z.infer<typeof AsistenciaSchema>;
