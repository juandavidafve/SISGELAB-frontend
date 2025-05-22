import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  PlantillaCertificadoForm,
  PlantillaCertificadoSchema,
} from "@/schemas/plantillas-certificados";

const base = "/certificados/plantillas/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return PlantillaCertificadoSchema.array().parse(req.data);
}

export async function create(plantilla: PlantillaCertificadoForm) {
  await api.postForm(urlMerge(base), plantilla);
}
