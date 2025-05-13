import { z } from "zod";

export const InfoUsuarioSchema = z.object({
  nombre: z.string(),
  roles: z
    .enum(["ROLE_INSTRUCTOR", "ROLE_ADMINISTRADOR", "ROLE_PARTICIPANTE"])
    .array(),
});

export type InfoUsuario = z.infer<typeof InfoUsuarioSchema>;
