import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { KeyValueItem } from "@/components/KeyValueItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import useAuth from "@/hooks/useAuth";
import { handleAxiosError } from "@/lib/error";
import { Asistencia } from "@/schemas/asistencia";
import { Sesion } from "@/schemas/sesion";
import {
  getAsistencias,
  getTokenAsistencia,
  toggleTokenAsistencia,
} from "@/services/sesion";

import AsistenciaItem from "./AsistenciaItem";
import TokenViewer from "./TokenViewer";

interface Props {
  sesion: Sesion;
}

export default function Asistencias({ sesion }: Props) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [asistencias, setAsistencias] = useState<Asistencia[]>();
  const [activeToken, setActiveToken] = useState(false);
  const [togglingToken, setTogglingToken] = useState(false);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    refreshAsistencias();
    updateTokenStatus();
  }, [sesion.id, token]);

  useEffect(() => {
    if (activeToken) {
      refreshInterval.current = setInterval(refreshAsistencias, 1000);
    } else if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
    }

    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [activeToken]);

  async function refreshAsistencias() {
    if (!token) return;

    setAsistencias(await getAsistencias(sesion.id));
    setLoading(false);
  }

  async function updateTokenStatus() {
    try {
      await getTokenAsistencia(sesion.id);
      setActiveToken(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) setActiveToken(false);
      }
    }
  }

  async function toggleToken() {
    try {
      setTogglingToken(true);
      await toggleTokenAsistencia(sesion.id);
      await updateTokenStatus();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    } finally {
      setTogglingToken(false);
    }
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h2 className="text-xl font-bold">Asistencia</h2>

        <Button disabled={togglingToken} onClick={toggleToken}>
          {togglingToken && <Loader className="size-4 text-white" />}
          {activeToken ? "Eliminar token" : "Generar token"}
        </Button>
      </div>

      {activeToken && (
        <div className="my-6 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
          <TokenViewer
            sesion={sesion}
            className="sm:col-span-2 md:col-span-1 md:row-span-2 lg:row-span-1"
          />
          <Card className="h-fit">
            <CardContent>
              <KeyValueItem
                label="Inscritos"
                values={asistencias?.length || 0}
                icon="material-symbols:article-person-outline-rounded"
              />
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardContent>
              <KeyValueItem
                label="Asistentes"
                values={asistencias?.filter((a) => a.asistio).length || 0}
                icon="material-symbols:person-raised-hand-outline-rounded"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {loading && <Loader className="mx-auto" />}

      <div className="space-y-4">
        {asistencias?.map((asistencia) => (
          <AsistenciaItem
            key={asistencia.id}
            sesion={sesion}
            asistencia={asistencia}
            refresh={refreshAsistencias}
          />
        ))}
      </div>
    </>
  );
}
