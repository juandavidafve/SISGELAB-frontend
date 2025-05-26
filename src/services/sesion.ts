import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { EvidenciaForm } from "@/schemas/evidencia";
import { SesionSchema } from "@/schemas/sesion";

const base = "/sesiones/";

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return SesionSchema.parse(req.data);
}

export async function addEvidencia(sesionId: number, evidencia: EvidenciaForm) {
  await api.postForm(urlMerge(base, sesionId, "evidencias"), evidencia);
}

export async function deleteEvidencia(sesionId: number, evidenciaId: number) {
  await api.delete(urlMerge(base, sesionId, "evidencias", evidenciaId));
}
