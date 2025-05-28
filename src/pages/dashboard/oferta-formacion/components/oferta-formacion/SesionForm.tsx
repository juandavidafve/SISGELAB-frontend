import { addBusinessDays } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FormCombobox from "@/components/ui/form-combobox";
import FormInputDate from "@/components/ui/form-input-date";
import FormInputTime from "@/components/ui/form-input-time";
import FormMultiSelector from "@/components/ui/form-multi-selector";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import {
  OfertaFormacionFormInput,
  OfertaFormacionFormOutput,
} from "@/schemas/oferta-formacion";
import { getAll as getInstructores } from "@/services/instructor";
import { getAll as getSalas } from "@/services/sala";

interface Props {
  control: Control<
    OfertaFormacionFormInput,
    unknown,
    OfertaFormacionFormOutput
  >;
}

export default function SesionForm({ control }: Props) {
  const { result: instructores } = useAsyncWithToken(getInstructores, []);
  const { result: salas } = useAsyncWithToken(getSalas, []);
  const {
    fields: sesiones,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "sesiones",
  });

  const sesionesValues = useWatch({
    control,
    name: "sesiones",
  });

  return (
    <div className="space-y-4">
      {sesiones.map((sesion, index) => (
        <Card key={sesion.id} className="p-4">
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInputDate
                control={control}
                name={`sesiones.${index}.fecha`}
                label="Fecha"
              />

              <FormCombobox
                control={control}
                name={`sesiones.${index}.id_sala`}
                items={salas || []}
                itemLabel="nombre"
                itemValue="id"
                label="Sala"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormInputTime
                control={control}
                name={`sesiones.${index}.inicio`}
                label="Inicio"
              />

              <FormInputTime
                control={control}
                name={`sesiones.${index}.fin`}
                label="Fin"
              />
            </div>
            <div>
              <FormMultiSelector
                control={control}
                name={`sesiones.${index}.instructores`}
                items={instructores || []}
                itemLabel="nombre"
                itemValue="id"
                label="Instructores"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              disabled={sesionesValues.length === 1}
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        onClick={() => {
          const lastSession = sesionesValues[sesionesValues.length - 1];
          append({
            ...lastSession,
            fecha: addBusinessDays(lastSession.fecha, 1),
            instructores: [...lastSession.instructores],
          });
        }}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" /> Agregar sesión
      </Button>
    </div>
  );
}
