import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  ParticipanteFormOutput,
  ParticipanteMinimalSchema,
  ParticipanteSchema,
} from "@/schemas/participante";

const base = "/participantes/";

export async function create(participante: ParticipanteFormOutput) {
  const res = await api.post(urlMerge(base), participante);
  return ParticipanteSchema.parse(res.data);
}

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return ParticipanteSchema.parse(req.data);
}

export async function search(query: string) {
  const req = await api.get(urlMerge(base, "search"), {
    params: {
      q: query,
    },
  });

  return ParticipanteSchema.array().parse(req.data);
}

export async function getAllNoInscritos(idOferta: number) {
  const req = await api.get(urlMerge(base, "no-inscritos", idOferta));

  return ParticipanteMinimalSchema.array().parse(req.data);
}
