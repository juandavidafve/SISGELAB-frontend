import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import CardSmall from "@/components/CardSmall";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import useAuth from "@/hooks/useAuth";
import {
  OfertaFormacionFormOutput,
  OfertaFormacionMinimal,
} from "@/schemas/oferta-formacion";
import {
  getAll as getOfertas,
  create as createOferta,
  getCategorias,
} from "@/services/oferta-formacion";

import { OfertaFormacionDialog } from "./components/OfertaFormacionDialog";

export default function OfertaFormacion() {
  const { info } = useAuth();
  const {
    result: ofertas,
    loading: loadingOfertas,
    execute: refreshOfertas,
    set: setOfertas,
  } = useAsyncWithToken(getOfertas, []);
  const { result: categorias } = useAsyncWithToken(getCategorias, []);

  const [ofertasBackup, setOfertasBackup] = useState<OfertaFormacionMinimal[]>(
    [],
  );

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (ofertas && ofertasBackup.length === 0) setOfertasBackup(ofertas);
  }, [ofertas, ofertasBackup.length]);

  async function onCreate(oferta: OfertaFormacionFormOutput) {
    await createOferta(oferta);
    toast.success("Oferta creada correctamente");
    await refreshOfertas();
    setOpenDialog(false);
  }

  function handleFilter(categoriaId?: number) {
    setOfertas({
      status: "success",
      loading: false,
      result:
        categoriaId !== undefined
          ? ofertasBackup.filter((oferta) => {
              return oferta.categoria.id === categoriaId;
            })
          : ofertasBackup,
      error: undefined,
    });
  }

  return (
    <>
      <div className="my-10 mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Ofertas de formación</h1>
        <OfertaFormacionDialog
          onSubmit={onCreate}
          open={openDialog}
          setOpen={setOpenDialog}
          variant="CREATE"
        />
        {info?.roles.includes("ROLE_ADMINISTRADOR") && (
          <Button onClick={() => setOpenDialog(true)}>Crear</Button>
        )}
      </div>

      {info?.roles.includes("ROLE_ADMINISTRADOR") && (
        <div className="my-6 flex gap-2">
          <Label className="mr-2">Categoría</Label>
          <Select onValueChange={(value) => handleFilter(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              {categorias?.map((categoria) => (
                <SelectItem
                  value={String(categoria.id)}
                  key={categoria.id}
                  onClick={() => {
                    handleFilter(categoria.id);
                  }}
                >
                  {categoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {ofertas?.length !== ofertasBackup.length && (
            <Button variant="ghost" size="icon" onClick={() => handleFilter()}>
              <Icon
                icon="material-symbols:close-rounded"
                className="size-6 text-red-500"
              />
            </Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {!loadingOfertas ? (
          ofertas?.map((oferta) => {
            return (
              <CardSmall
                title={oferta.nombre}
                slotAction={
                  <Link to={String(oferta.id)}>
                    {(info?.roles.includes("ROLE_ADMINISTRADOR") ||
                      info?.roles.includes("ROLE_INSTRUCTOR")) && (
                      <Button className="bg-red-500 text-white hover:bg-red-600">
                        Ver
                      </Button>
                    )}
                  </Link>
                }
                key={oferta.id}
              />
            );
          })
        ) : (
          <div className="my-5 flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
