import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { handleAxiosError } from "@/lib/error";
import { downloadFile, formatDate, urlMerge } from "@/lib/utils";
import { Certificado } from "@/schemas/certificado";

interface Props {
  certificado: Certificado;
}
export default function CertificadoItem({ certificado }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload(certificado: Certificado) {
    try {
      setLoading(true);
      await downloadFile(
        urlMerge("certificados", certificado.id),
        `${certificado.id} - ${certificado.oferta_formacion}.doc`,
      );
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
    <CardSmall
      key={certificado.id}
      icon="lineicons:certificate-badge-1"
      title={certificado.oferta_formacion}
      description={formatDate(certificado.fecha, "dd/MM/yyyy")}
      slotAction={
        <Button disabled={loading} onClick={() => handleDownload(certificado)}>
          {loading ? (
            <>
              <Loader className="size-4 text-white" />
              Descargando
            </>
          ) : (
            "Descargar"
          )}
        </Button>
      }
    />
  );
}
