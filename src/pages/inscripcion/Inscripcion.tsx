import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { BACKEND_BASE_URL } from "@/lib/config";
import { handleAxiosError } from "@/lib/error";
import { urlMerge } from "@/lib/utils";
import {
  getById as getOfertaById,
  inscribir,
} from "@/services/oferta-formacion";

export default function Inscripcion() {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout>();
  const idInt = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;

  const { result: oferta } = useAsync(async () => {
    if (!idInt) return;
    return await getOfertaById(idInt);
  }, [idInt]);

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [redirectTimer]);

  useEffect(() => {
    if (user === null) {
      toast.warning("Inicia sesión o crea una cuenta para registrarte");
    }
  }, [user]);

  async function handleInscripcion() {
    if (!idInt) return;
    try {
      await inscribir(idInt);
      toast.success("Inscripción registrada correctamente.");
      setRedirectTimer(
        setTimeout(() => navigate("/dashboard/oferta-formacion"), 3000),
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        handleAxiosError(toast.error, err);
      }
    }
  }

  if (!idInt || !oferta) return;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Inscripción a oferta de formación</h1>
      <h2 className="text-xl font-bold">{oferta.nombre}</h2>
      <img
        className="w-full max-w-xl rounded-xl"
        src={urlMerge(BACKEND_BASE_URL, oferta.pieza_grafica)}
      ></img>

      {user !== null ? (
        <Button onClick={handleInscripcion}>Inscribirse</Button>
      ) : (
        <Link to={`/auth/login?redirectTo=${location.pathname}`}>
          <Button>Iniciar Sesión</Button>
        </Link>
      )}
    </div>
  );
}
