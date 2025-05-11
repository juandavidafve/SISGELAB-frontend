import { Link } from "react-router";

import CardSmall from "@/components/CardSmall";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { OfertaFormacionFormOutput } from "@/schemas/oferta-formacion";
import { getAll as getOfertas } from "@/services/oferta-formacion";

import OfertaFormacionForm from "./components/OfertaFormacionForm";

export default function OfertaFormacion() {
  const { result: ofertas } = useAsyncWithToken(getOfertas, []);

  function onCreate(oferta: OfertaFormacionFormOutput) {}

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Ofertas de formación</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Crear</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear oferta de formación</DialogTitle>
            </DialogHeader>
            <OfertaFormacionForm onSubmit={onCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {ofertas?.map((oferta) => {
          return (
            <CardSmall
              title={oferta.nombre}
              slotAction={
                <Link to={String(oferta.id)}>
                  <Button className="bg-red-500 text-white hover:bg-red-600">
                    Ver
                  </Button>
                </Link>
              }
              key={oferta.id}
            />
          );
        })}
      </div>
    </>
  );
}
