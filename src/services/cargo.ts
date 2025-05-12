import { api } from "@/lib/axios";
import { BaseEntitySchema } from "@/schemas/generic";

const base = "/cargos/";

export async function getAll() {
  const req = await api.get(base);

  return BaseEntitySchema.array().parse(req.data);
}
