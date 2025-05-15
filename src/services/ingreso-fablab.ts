import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  IngresoFablabFormOutput,
  IngresoFablabSchema,
} from "@/schemas/ingreso-fablab";

const base = "/ingresos-fablab/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return IngresoFablabSchema.array().parse(req.data);
}

export async function create(ingreso: IngresoFablabFormOutput) {
  await api.post(urlMerge(base), ingreso);
}
