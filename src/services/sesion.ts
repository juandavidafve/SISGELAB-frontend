import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { AsistenciaSchema } from "@/schemas/asistencia";
import { EvidenciaForm } from "@/schemas/evidencia";
import { SesionOtpSchema, SesionSchema } from "@/schemas/sesion";

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

export async function getAsistencias(sesionId: number) {
  const req = await api.get(urlMerge(base, sesionId, "asistencias"));

  return AsistenciaSchema.array().parse(req.data);
}

export async function toggleAsistencia(
  sesionId: number,
  participanteId: number,
) {
  await api.post(urlMerge(base, sesionId, "asistencias", participanteId));
}

export async function getTokenAsistencia(sesionId: number) {
  const req = await api.get(urlMerge(base, sesionId, "asistencias/token"));

  return SesionOtpSchema.parse(req.data);
}

export async function toggleTokenAsistencia(sesionId: number) {
  await api.post(urlMerge(base, sesionId, "asistencias/toggle-token"));
}

export async function marcarAsistencia(sesionId: number, token: string) {
  await api.post(urlMerge(base, sesionId, "asistencias"), {
    token,
  });
}
