import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { api } from "@/lib/axios";
import { handleAxiosError } from "@/lib/error";
import { PlantillaCertificado } from "@/schemas/plantillas-certificados";

interface Props {
  plantilla: PlantillaCertificado;
}

export function PlantillaPreview({ plantilla }: Props) {
  const [loading, setLoading] = useState(false);

  async function openPDF() {
    try {
      setLoading(true);
      const { data } = await api.get(plantilla.url, {
        responseType: "blob",
      });
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url);
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
    <Button onClick={openPDF} disabled={loading}>
      {loading && <Loader className="size-4 text-white" />}
      Ver
    </Button>
  );
}
