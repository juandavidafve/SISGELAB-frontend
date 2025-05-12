import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { BaseEntitySchema } from "@/schemas/generic";

const base = "/estados-civiles/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return BaseEntitySchema.array().parse(req.data);
}
