import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { BaseEntitySchema } from "@/schemas/generic";
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
  await api.postForm(base, oferta, {
    formSerializer: {
      dots: true,
    },
  });
}

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return OfertaFormacionSchema.parse(req.data);
}

export async function getTiposOferta() {
  const req = await api.get(urlMerge(base, "/tipos-oferta"));

  return BaseEntitySchema.array().parse(req.data);
}

export async function getCategorias() {
  const req = await api.get(urlMerge(base, "/categorias"));

  return BaseEntitySchema.array().parse(req.data);
}

export async function getTiposBeneficiario() {
  const req = await api.get(urlMerge(base, "/tipos-beneficiario"));

  return BaseEntitySchema.array().parse(req.data);
}
