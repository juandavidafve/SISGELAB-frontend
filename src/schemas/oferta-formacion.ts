import { z } from "zod";

const EstadoOfertaFormacionSchema = z.enum([
  "ACTIVA",
  "INACTIVA",
  "FINALIZADA",
]);

export const OfertaFormacionMinimalSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  estado: EstadoOfertaFormacionSchema,
});
