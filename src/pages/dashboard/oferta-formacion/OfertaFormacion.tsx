import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
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
import { InfoUsuario } from "@/schemas/info-usuario";
import {
  OfertaFormacionFormOutput,
  OfertaFormacionMinimal,
} from "@/schemas/oferta-formacion";
import {
  getAll as getOfertas,
  create as createOferta,
  getCategorias,
  getOfertasWhereInstructor,
  getOfertasWhereParticipante,
  getOfertasActivas,
} from "@/services/oferta-formacion";

import BadgeEstado from "./components/BadgeEstado";
import { OfertaFormacionDialog } from "./components/oferta-formacion/OfertaFormacionDialog";

export default function OfertaFormacion() {
  const { info } = useAuth();
  const {
    result: ofertas,
    loading: loadingOfertas,
    execute: refreshOfertas,
  } = useAsyncWithToken(
    async (info: InfoUsuario | undefined) => {
      if (!info) return;

      if (info.roles.includes("ROLE_ADMINISTRADOR")) return await getOfertas();

      let ofertas: OfertaFormacionMinimal[] = [];

      if (info.roles.includes("ROLE_INSTRUCTOR")) {
        ofertas = [...ofertas, ...(await getOfertasWhereInstructor())];
      }

      if (info.roles.includes("ROLE_PARTICIPANTE")) {
        ofertas = [...ofertas, ...(await getOfertasWhereParticipante())];
      }

      setSelectedCategoryId(undefined);

      return ofertas;
    },
    [info],
  );

  const { result: categorias } = useAsyncWithToken(getCategorias, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const { result: catalogo, loading: loadingCatalog } = useAsyncWithToken(
    getOfertasActivas,
    [],
  );

  const [openDialog, setOpenDialog] = useState(false);

  async function onCreate(oferta: OfertaFormacionFormOutput) {
    await createOferta(oferta);
    toast.success("Oferta creada correctamente");
    await refreshOfertas();
    setOpenDialog(false);
  }

  function filterByCategoria(ofertas: OfertaFormacionMinimal[]) {
    if (selectedCategoryId === undefined) return ofertas;
    return ofertas.filter(
      (oferta) => oferta.categoria.id === selectedCategoryId,
    );
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
          <Select
            key={selectedCategoryId}
            value={
              selectedCategoryId !== undefined
                ? String(selectedCategoryId)
                : undefined
            }
            onValueChange={(id) => {
              const idNum = parseInt(id);
              if (!isNaN(idNum)) {
                setSelectedCategoryId(idNum);
              } else {
                setSelectedCategoryId(undefined);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              {categorias?.map((categoria) => (
                <SelectItem value={String(categoria.id)} key={categoria.id}>
                  {categoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCategoryId !== undefined && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedCategoryId(undefined)}
            >
              <Icon
                icon="material-symbols:close-rounded"
                className="size-6 text-red-500"
              />
            </Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {!loadingOfertas && ofertas ? (
          filterByCategoria(ofertas).map((oferta) => {
            return (
              <CardSmall
                title={oferta.nombre}
                slotAction={
                  <div className="flex flex-row items-center gap-2">
                    <BadgeEstado
                      estado={oferta.estado}
                      className="hidden sm:flex"
                    />
                    <Link to={String(oferta.id)}>
                      <Button className="bg-red-500 text-white hover:bg-red-600">
                        Ver
                      </Button>
                    </Link>
                  </div>
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

      {!info?.roles.includes("ROLE_ADMINISTRADOR") && (
        <>
          <h2 className="my-10 mb-6 text-xl font-bold">Catálogo de Ofertas</h2>
          <div className="space-y-4">
            {!(loadingOfertas && loadingCatalog) ? (
              catalogo
                ?.filter((oferta) => {
                  const exists = ofertas?.find((o) => o.id === oferta.id);

                  return exists === undefined;
                })
                .map((oferta) => {
                  return (
                    <CardSmall
                      title={oferta.nombre}
                      slotAction={
                        <Link to={`/inscripcion/${oferta.id}`} target="_blank">
                          <Button className="bg-red-500 text-white hover:bg-red-600">
                            Inscripción
                          </Button>
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
      )}
    </>
  );
}
