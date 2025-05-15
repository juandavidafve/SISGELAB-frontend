import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { SesionSchema } from "@/schemas/sesion";

const base = "/sesiones/";

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return SesionSchema.parse(req.data);
}
