import { ZodError } from "zod";

import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  DatosPersonalesFormOutput,
  DatosPersonalesSchema,
} from "@/schemas/datos-personales";

const base = "/usuarios/datos-personales/";

export async function create(data: DatosPersonalesFormOutput) {
  await api.post(urlMerge(base), data);
}

export async function update(data: DatosPersonalesFormOutput) {
  await api.put(urlMerge(base), data);
}

export async function get() {
  const req = await api.get(urlMerge(base));

  try {
    return DatosPersonalesSchema.parse(req.data);
  } catch (err) {
    if (err instanceof ZodError) {
      return undefined;
    }
  }
}
