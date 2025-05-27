import { parse } from "date-fns";
import { z } from "zod";

import { zodDateFromString, zodStringFromDate } from "@/lib/utils";

import { EvidenciaSchema } from "./evidencia";
import { BaseEntitySchema } from "./generic";
import { InstructorMinimalSchema } from "./instructor";

export const SesionSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  fecha: zodDateFromString(),
  inicio: z.string().time(),
  fin: z.string().time(),
  sala: BaseEntitySchema,
  instructores: InstructorMinimalSchema.array(),
  //participantes: BaseEntitySchema.array(),
  evidencias: EvidenciaSchema.array(),
});

export type Sesion = z.infer<typeof SesionSchema>;

export const SesionMinimalSchema = SesionSchema.pick({
  id: true,
  nombre: true,
  fecha: true,
  inicio: true,
  fin: true,
  sala: true,
  instructores: true,
});

export type SesionMinimal = z.infer<typeof SesionMinimalSchema>;

export const SesionFormSchema = z
  .object({
    fecha: zodStringFromDate(),
    inicio: z.string().time(),
    fin: z.string().time(),
    id_sala: z.number().min(1, "Se requiere seleccionar la sala"),
    instructores: z
      .number()
      .array()
      .nonempty("Las sesiones deben tener al menos un instructor asignado"),
  })
  .refine(
    (data) => {
      return (
        parse(data.fin, "HH:mm", new Date()) >
        parse(data.inicio, "HH:mm", new Date())
      );
    },
    {
      message: "La hora de fin debe ser posterior a la de inicio",
      path: ["fin"],
    },
  );

export type SesionFormInput = z.input<typeof SesionFormSchema>;
export type SesionFormOutput = z.infer<typeof SesionFormSchema>;

export function convertSesionToFormInput(
  entity: SesionMinimal,
): SesionFormInput {
  return {
    ...entity,
    id_sala: entity.sala.id,
    instructores: entity.instructores.map((instructor) => instructor.id) as [
      number,
      ...number[],
    ],
  };
}
