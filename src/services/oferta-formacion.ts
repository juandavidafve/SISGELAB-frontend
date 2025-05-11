import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  OfertaFormacionFormOutput,
  OfertaFormacionMinimalSchema,
  OfertaFormacionSchema,
} from "@/schemas/oferta-formacion";

const base = "/ofertas/";

export async function getAll() {
  const req = await api.get(base);

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

export async function create(oferta: OfertaFormacionFormOutput) {
  const req = await api.postForm(base);

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return OfertaFormacionSchema.parse(req.data);
}
