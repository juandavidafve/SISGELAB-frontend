import { api } from "@/lib/axios";
import { ReporteSchema } from "@/schemas/reporte";

const base = "/reportes/";

export async function get(plantilla: string) {
  const req = await api.get(base, {
    params: {
      plantilla,
    },
  });

  return ReporteSchema.parse(req.data);
}
