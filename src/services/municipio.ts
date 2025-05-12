import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { MunicipioSchema } from "@/schemas/municipio";

const base = "/municipios/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return MunicipioSchema.array().parse(req.data);
}
