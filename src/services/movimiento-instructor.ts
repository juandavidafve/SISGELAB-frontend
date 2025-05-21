import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  MovimientoInstructorFormOutput,
  MovimientoInstructorSchema,
} from "@/schemas/movimiento-instructor";

const base = "/movimientos/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return MovimientoInstructorSchema.array().parse(req.data);
}

export async function create(movimiento: MovimientoInstructorFormOutput) {
  await api.post(urlMerge(base), movimiento);
}

export async function remove(id: number) {
  await api.delete(urlMerge(base, id));
}
