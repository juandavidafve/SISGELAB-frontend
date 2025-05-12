import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { SemilleroSchema } from "@/schemas/semillero";

const base = "/semilleros/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return SemilleroSchema.array().parse(req.data);
}
