import { api } from "@/lib/axios";
import { ProgramaAcademicoSchema } from "@/schemas/programa-academico";

const base = "/programas-academicos/";

export async function getAll() {
  const req = await api.get(base);

  return ProgramaAcademicoSchema.array().parse(req.data);
}
