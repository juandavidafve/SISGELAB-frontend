import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { EvidenciaForm } from "@/schemas/evidencia";
import { Sesion } from "@/schemas/sesion";
import { addEvidencia } from "@/services/sesion";

import EvidenciaDataTable from "./EvidenciaDataTable";
import { EvidenciaDialog } from "./EvidenciaDialog";

interface Props {
  sesion: Sesion;
  refresh: () => void;
}

export default function Evidencias({ sesion, refresh }: Props) {
  const { info } = useAuth();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  async function handleCreate(evidencia: EvidenciaForm) {
    await addEvidencia(sesion.id, evidencia);

    toast.success("Evidencia creada correctamente");
    await refresh();
    setOpenCreateDialog(false);
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h2 className="text-xl font-bold">Evidencias</h2>
        {info?.roles.includes("ROLE_INSTRUCTOR") && (
          <Button onClick={() => setOpenCreateDialog(true)}>Agregar</Button>
        )}
      </div>

      <EvidenciaDataTable refresh={refresh} sesion={sesion} />

      <EvidenciaDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSubmit={handleCreate}
      />
    </>
  );
}
