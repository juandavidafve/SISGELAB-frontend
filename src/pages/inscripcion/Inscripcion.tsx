import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import useAuth from "@/hooks/useAuth";
import { BACKEND_BASE_URL } from "@/lib/config";
import { urlMerge } from "@/lib/utils";
import { getById as getOfertaById } from "@/services/oferta-formacion";

export default function Inscripcion() {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  const { result: oferta } = useAsyncWithToken(
    async (id) => {
      if (id === undefined) return;
      const idInt = parseInt(id);
      if (isNaN(idInt)) return;

      return await getOfertaById(idInt);
    },
    [id],
  );

  useEffect(() => {
    if (user === null) {
      toast.warning("Inicia sesión o crea una cuenta para registrarte");
    }
  }, [user]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Inscripción a oferta de formación
      </h1>
      <h2 className="mb-4 text-xl font-bold">{oferta?.nombre}</h2>
      <img src={urlMerge(BACKEND_BASE_URL, oferta?.pieza_grafica)}></img>

      {user !== null ? (
        <Link to="">
          <Button>Inscribirse</Button>
        </Link>
      ) : (
        <Link to={`/auth/login?redirectUri=${location.pathname}`}>
          <Button>Iniciar Sesión</Button>
        </Link>
      )}
    </div>
  );
}
