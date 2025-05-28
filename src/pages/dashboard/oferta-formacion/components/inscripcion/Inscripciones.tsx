import { useState } from "react";

import { Button } from "@/components/ui/button";
import { OfertaFormacion } from "@/schemas/oferta-formacion";

import InscripcionDataTable from "./InscripcionDataTable";
import { InscripcionDialog } from "./InscripcionDialog";

interface Props {
  oferta: OfertaFormacion;
  refresh: () => void;
}

export default function Inscripciones({ oferta, refresh }: Props) {
  const [openInscripcionDialog, setOpenInscripcionDialog] = useState(false);

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h2 className="text-xl font-bold">Inscripciones</h2>
        <Button onClick={() => setOpenInscripcionDialog(true)}>
          Inscribir
        </Button>
      </div>

      <InscripcionDataTable oferta={oferta} refresh={refresh} />

      <InscripcionDialog
        oferta={oferta}
        refresh={refresh}
        open={openInscripcionDialog}
        setOpen={setOpenInscripcionDialog}
      />
    </>
  );
}
