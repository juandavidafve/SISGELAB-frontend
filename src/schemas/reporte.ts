import { z } from "zod";

export const ReporteSchema = z
  .object({
    nombre: z.string(),
    datos: z.record(z.string(), z.string().or(z.number()).nullish()).array(),
  })
  .array();

export type Reporte = z.infer<typeof ReporteSchema>;
