import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { get as getOfertas } from "@/services/oferta";

import OfertaFormacionCard from "./components/OfertaFormacionCard";

export default function OfertaFormacion() {
  const { result: ofertas } = useAsyncWithToken(getOfertas, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Ofertas de Formación</h2>
        {ofertas?.map((oferta) => {
          return <OfertaFormacionCard oferta={oferta} key={oferta.id} />;
        })}
      </div>
    </div>
  );
}
