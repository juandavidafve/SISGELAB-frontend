import { z } from "zod";

import { zodDateTimeFromString, zodStringFromDateTime } from "@/lib/utils";

import { InstructorMinimalSchema } from "./instructor";

export const MovimientoInstructorSchema = z.object({
  id: z.number(),
  fecha: zodDateTimeFromString(),
  instructor: InstructorMinimalSchema,
  tipo: z.enum(["ENTRADA", "SALIDA"]),
});

export const MovimientoInstructorFormSchema = z.object({
  fecha: zodStringFromDateTime(),
  id_instructor: z.number().min(1, "Se require seleccionar el instructor"),
  tipo: z.enum(["ENTRADA", "SALIDA"], {
    message: "Se requiere el tipo de movimiento",
  }),
});

export type MovimientoInstructor = z.infer<typeof MovimientoInstructorSchema>;

export type MovimientoInstructorFormInput = z.input<
  typeof MovimientoInstructorFormSchema
>;

export type MovimientoInstructorFormOutput = z.infer<
  typeof MovimientoInstructorFormSchema
>;
