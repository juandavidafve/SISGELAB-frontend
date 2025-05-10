import { api } from "@/lib/axios";
import { OfertaFormacionMinimalSchema } from "@/schemas/oferta-formacion";

const base = "/ofertas/";

export async function get() {
  const req = await api.get(base);

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}
