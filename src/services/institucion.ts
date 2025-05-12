import { api } from "@/lib/axios";
import { InstitucionSchema } from "@/schemas/institucion";

const base = "/instituciones/";

export async function getAll() {
  const req = await api.get(base);

  return InstitucionSchema.array().parse(req.data);
}
