import { Link } from "react-router";

import CardSmall from "@/components/CardSmall";
import { Button } from "@/components/ui/button";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { get as getOfertas } from "@/services/oferta-formacion";

export default function OfertaFormacion() {
  const { result: ofertas } = useAsyncWithToken(getOfertas, []);

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Ofertas de Formación</h2>
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
