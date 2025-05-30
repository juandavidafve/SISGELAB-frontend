import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { OfertaFormacion } from "@/schemas/oferta-formacion";
import { SesionMinimal } from "@/schemas/sesion";
import { marcarAsistencia } from "@/services/sesion";

import { AsistenciaDialog } from "./AsistenciaDialog";

interface Props {
  oferta: OfertaFormacion;
  refresh: () => void;
}

export default function Sesiones({ oferta, refresh }: Props) {
  const { info } = useAuth();

  const [showAsistenciaDialog, setShowAsistenciaDialog] = useState(false);
  const [selectedSesion, setSelectedSesion] = useState<SesionMinimal>();

  async function marcarAsistenciaConToken(token: string) {
    if (!selectedSesion) return;
    await marcarAsistencia(selectedSesion?.id, token);
    toast.success("Asistencia marcada correctamente");
    setShowAsistenciaDialog(false);
    refresh();
  }

  return (
    <>
      <h2 className="my-10 mb-6 text-xl font-bold">Sesiones</h2>
      <div className="space-y-4">
        {oferta.sesiones.map((sesion) => (
          <CardSmall
            title={sesion.nombre}
            description={`${formatDate(sesion.fecha, "dd/MM/yyyy")} ${sesion.inicio}`}
            slotAction={
              <>
                {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
                  info?.roles.includes("ROLE_INSTRUCTOR")) && (
                  <Button>
                    <Link to={`../sesion/${sesion.id}`}>Ver</Link>
                  </Button>
                )}

                {info?.roles.includes("ROLE_PARTICIPANTE") &&
                  (sesion.estado === "PENDIENTE" ? (
                    <Button
                      onClick={() => {
                        setSelectedSesion(sesion);
                        setShowAsistenciaDialog(true);
                      }}
                    >
                      Marcar Asistencia
                    </Button>
                  ) : (
                    <Badge
                      className="w-28"
                      variant={
                        sesion.estado === "AUSENTE"
                          ? "red"
                          : sesion.estado === "PRESENTE"
                            ? "green"
                            : "neutral"
                      }
                    >
                      {sesion.estado}
                    </Badge>
                  ))}
              </>
            }
            key={sesion.id}
          />
        ))}
      </div>

      <AsistenciaDialog
        onSubmit={marcarAsistenciaConToken}
        open={showAsistenciaDialog}
        setOpen={setShowAsistenciaDialog}
      />
    </>
  );
}
