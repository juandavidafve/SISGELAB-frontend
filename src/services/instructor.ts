import { api } from "@/lib/axios";
import { InstructorMinimalSchema } from "@/schemas/instructor";

const base = "/instructores/";

export async function getAll() {
  const req = await api.get(base);

  return InstructorMinimalSchema.array().parse(req.data);
}
