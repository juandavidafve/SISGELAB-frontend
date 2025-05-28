import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/ui/loader";
import { handleAxiosError } from "@/lib/error";
import { cn } from "@/lib/utils";
import { Asistencia } from "@/schemas/asistencia";
import { Sesion } from "@/schemas/sesion";
import { toggleAsistencia } from "@/services/sesion";

interface Props {
  refresh: () => void;
  sesion: Sesion;
  asistencia: Asistencia;
}

export default function AsistenciaItem({ sesion, asistencia, refresh }: Props) {
  const [loading, setLoading] = useState(false);
  async function handleToggle() {
    if (loading) return;

    try {
      setLoading(true);
      await toggleAsistencia(sesion.id, asistencia.participante.id);
      await refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className={cn(
        "cursor-pointer py-4 transition",
        asistencia.asistio && "bg-green-200",
      )}
      onClick={handleToggle}
      role="button"
    >
      <CardContent className="grid grid-cols-[1.5rem_auto] content-start gap-4 px-4">
        {loading ? (
          <Loader className="size-6" />
        ) : (
          <Checkbox checked={asistencia.asistio} />
        )}

        <span>{asistencia.participante.nombre}</span>
      </CardContent>
    </Card>
  );
}
