import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  InstructorFormOutput,
  InstructorMinimalSchema,
  InstructorSchema,
} from "@/schemas/instructor";

const base = "/instructores/";

export async function getAll() {
  const req = await api.get(urlMerge(base));

  return InstructorMinimalSchema.array().parse(req.data);
}

export async function getById(id: number) {
  const req = await api.get(urlMerge(base, id));

  return InstructorSchema.parse(req.data);
}

export async function create(instructor: InstructorFormOutput) {
  await api.post(urlMerge(base), instructor);
}
