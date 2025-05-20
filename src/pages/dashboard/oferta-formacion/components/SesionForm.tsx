import { addBusinessDays } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInputDate from "@/components/ui/form-input-date";
import FormInputTime from "@/components/ui/form-input-time";
import MultiSelector from "@/components/ui/multi-selector";
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
      {sesiones.map((_, index) => (
        <Card key={index} className="p-4">
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
              {instructores && (
                <FormField
                  control={control}
                  name={`sesiones.${index}.instructores`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelector
                          value={field.value
                            .map((instructorId) =>
                              instructores.find(
                                (instructor) => instructor.id === instructorId,
                              ),
                            )
                            .filter((instructor) => instructor !== undefined)}
                          items={instructores}
                          itemLabel={(instructor) => instructor.nombre}
                          itemValue={(instructor) => instructor.id}
                          onChange={(value) =>
                            field.onChange(value.map((v) => v.id))
                          }
                          className="w-full"
                          label="Instructores"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
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
          append(
            lastSession
              ? {
                  ...lastSession,
                  fecha: addBusinessDays(lastSession.fecha, 1),
                  instructores: [...lastSession.instructores],
                }
              : {
                  fecha: new Date(),
                  inicio: "00:00",
                  fin: "00:00",
                  id_sala: 0,
                  instructores: [],
                },
          );
        }}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" /> Agregar sesión
      </Button>
    </div>
  );
}
