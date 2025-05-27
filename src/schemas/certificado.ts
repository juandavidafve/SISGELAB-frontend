import { z } from "zod";

import { zodDateTimeFromString } from "@/lib/utils";

export const CertificadoSchema = z.object({
  id: z.number(),
  instructor: z.string(),
  oferta_formacion: z.string(),
  fecha: zodDateTimeFromString(),
});

export type Certificado = z.infer<typeof CertificadoSchema>;
