import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { PaisSchema } from "@/schemas/pais";

const base = "/paises/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return PaisSchema.array().parse(req.data);
}
