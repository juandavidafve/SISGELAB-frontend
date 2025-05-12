import { api } from "@/lib/axios";
import { IngresoFablabFormOutput } from "@/schemas/ingreso-fablab";

const base = "/ingresos-fablab/";

export async function create(ingreso: IngresoFablabFormOutput) {
  await api.post(base, ingreso);
}
