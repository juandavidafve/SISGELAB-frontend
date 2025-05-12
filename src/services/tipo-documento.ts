import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { TipoDocumentoSchema } from "@/schemas/tipo-documento";

const base = "/tipos-documento/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return TipoDocumentoSchema.array().parse(req.data);
}
