import { useState } from "react";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { PlantillaCertificadoForm } from "@/schemas/plantillas-certificados";
import {
  create as createPlantilla,
  getAll as getPlantillas,
} from "@/services/plantillas-certificados";

import { PlantillaDialog } from "./PlantillaDialog";
import { PlantillaPreview } from "./PlantillaPreview";

export default function Plantillas() {
  const {
    result: plantillas,
    loading: plantillasLoading,
    execute: refreshPlantillas,
  } = useAsyncWithToken(getPlantillas, []);
  const [showPlantillaDialog, setShowPlantillaDialog] = useState(false);

  async function handleCreate(plantilla: PlantillaCertificadoForm) {
    await createPlantilla(plantilla);

    toast.success("Plantilla creada correctamente");
    await refreshPlantillas();
    setShowPlantillaDialog(false);
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h2 className="text-xl font-bold">Plantillas</h2>

        <Button onClick={() => setShowPlantillaDialog(true)}>Crear</Button>
      </div>

      {!plantillasLoading ? (
        <div>
          {plantillas?.map((plantilla) => {
            return (
              <CardSmall
                icon="ic:outline-file-present"
                key={plantilla.id}
                title={plantilla.nombre}
                slotAction={<PlantillaPreview plantilla={plantilla} />}
              />
            );
          })}
        </div>
      ) : (
        <div className="my-5 flex justify-center">
          <Loader />
        </div>
      )}

      <PlantillaDialog
        open={showPlantillaDialog}
        setOpen={setShowPlantillaDialog}
        onSubmit={handleCreate}
      />
    </>
  );
}
