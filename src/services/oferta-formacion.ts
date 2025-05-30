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
  const req = await api.get(urlMerge(base));

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

const serialize = (oferta: OfertaFormacionFormOutput) => {
  const formData = new FormData();

  // Custom serialization function for nested objects with array indexes and dot notation
  const serializeToForm = (obj: any, prefix = "") => {
    for (const key in obj) {
      const value = obj[key];
      const name = prefix
        ? Array.isArray(obj)
          ? `${prefix}[${key}]`
          : `${prefix}.${key}`
        : key;

      if (value === null || value === undefined) {
        formData.append(name, "");
      } else if (typeof value === "object" && !(value instanceof File)) {
        serializeToForm(value, name);
      } else {
        formData.append(name, value);
      }
    }
  };
  serializeToForm(oferta);
  return formData;
};

export async function create(oferta: OfertaFormacionFormOutput) {
  await api.postForm(urlMerge(base), serialize(oferta));
}

export async function update(id: number, oferta: OfertaFormacionFormOutput) {
  await api.putForm(urlMerge(base, id), serialize(oferta));
}

export async function toggle(id: number) {
  await api.put(urlMerge(base, id, "switch-estado"));
}

export async function finalizar(idOferta: number, idPlantilla: number) {
  await api.post(urlMerge(base, idOferta, "finalizar", idPlantilla));
}

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return OfertaFormacionSchema.parse(req.data);
}

export async function getOfertasWhereInstructor() {
  const req = await api.get(urlMerge(base, "instructor"));

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

export async function getOfertasWhereParticipante() {
  const req = await api.get(urlMerge(base, "participante"));

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

export async function getOfertasActivas() {
  const req = await api.get(urlMerge(base, "activas"));

  return OfertaFormacionMinimalSchema.array().parse(req.data);
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

export async function inscribir(idOferta: number) {
  await api.post(urlMerge(base, idOferta, "/inscribir"));
}

export async function inscribirParticipante(
  idOferta: number,
  idParticipante: number,
) {
  await api.post(
    urlMerge(base, idOferta, "/inscribir-participante/", idParticipante),
  );
}

export async function desinscribirParticipante(
  idOferta: number,
  idParticipante: number,
) {
  await api.delete(
    urlMerge(base, idOferta, "/desinscribir-participante/", idParticipante),
  );
}
