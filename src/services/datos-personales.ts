import { api } from "@/lib/axios";
import { DatosPersonalesFormOutput } from "@/schemas/datos-personales";

const base = "/datos-personales/";

export async function create(data: DatosPersonalesFormOutput) {
  await api.post(base, data);
}
