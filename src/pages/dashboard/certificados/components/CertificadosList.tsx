import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { getAll as getCertificados } from "@/services/certificados";

import CertificadoItem from "./CertificadoItem";

export default function CertificadosList() {
  const { result: certificados, loading: certificadosLoading } =
    useAsyncWithToken(getCertificados, []);

  if (certificadosLoading) {
    return <Loader className="mx-auto" />;
  }

  return (
    <div className="space-y-4">
      {certificados &&
        certificados.map((certificado) => {
          return <CertificadoItem certificado={certificado} />;
        })}
    </div>
  );
}
