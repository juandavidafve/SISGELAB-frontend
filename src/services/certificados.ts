import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { CertificadoSchema } from "@/schemas/certificado";
import {
  PlantillaCertificadoForm,
  PlantillaCertificadoSchema,
} from "@/schemas/plantillas-certificados";

const base = "/certificados/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return CertificadoSchema.array().parse(req.data);
}

export async function getPlantillas() {
  const req = await api.get(urlMerge(base, "plantillas"));

  return PlantillaCertificadoSchema.array().parse(req.data);
}

export async function createPlantilla(plantilla: PlantillaCertificadoForm) {
  await api.postForm(urlMerge(base, "plantillas"), plantilla);
}
