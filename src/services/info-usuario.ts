import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import { InfoUsuarioSchema } from "@/schemas/info-usuario";

const base = "/usuarios/roles/";

export async function get() {
  const req = await api.get(urlMerge(base));

  return InfoUsuarioSchema.parse(req.data);
}
