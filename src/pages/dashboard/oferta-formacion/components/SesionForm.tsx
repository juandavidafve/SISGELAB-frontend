import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputDate } from "@/components/ui/input-date";
import { InputNumber } from "@/components/ui/input-number";
import { InputTime } from "@/components/ui/input-time";
import { Label } from "@/components/ui/label";
import MultiSelector from "@/components/ui/multi-selector";
import { SesionFormInput } from "@/schemas/sesion";

interface SesionFormProps {
  value: SesionFormInput[];
  onChange: (value: SesionFormInput[]) => void;
}

export default function SesionForm({ value, onChange }: SesionFormProps) {
  const instructores = [
    {
      id: 34,
      nombre: "Pepe",
    },
    {
      id: 56,
      nombre: "Juan",
    },
    {
      id: 46,
      nombre: "Mario",
    },
  ];

  const handleChange = (
    index: number,
    field: keyof SesionFormInput,
    val: unknown,
  ) => {
    const newSesiones = [...value];

    newSesiones[index] = {
      ...newSesiones[index],
      [field]: val,
    };

    onChange(newSesiones);
  };

  const addSesion = () => {
    onChange([
      ...value,
      {
        fecha: new Date(),
        inicio: "00:00",
        fin: "00:00",
        id_sala: 0,
        instructores: [],
      },
    ]);
  };

  const removeSesion = (index: number) => {
    const newSesiones = value.filter((_, i) => i !== index);
    onChange(newSesiones);
  };

  return (
    <div className="space-y-4">
      {value.map((sesion, index) => (
        <Card key={index} className="p-4">
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fecha</Label>
                <InputDate
                  value={sesion.fecha}
                  onChange={(value) => handleChange(index, "fecha", value)}
                />
              </div>
              <div>
                <Label>ID Sala</Label>
                <InputNumber
                  value={sesion.id_sala}
                  onChange={(value) => handleChange(index, "id_sala", value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Inicio</Label>

                <InputTime
                  value={sesion.inicio}
                  onChange={(value) => handleChange(index, "inicio", value)}
                />
              </div>
              <div>
                <Label>Fin</Label>

                <InputTime
                  value={sesion.fin}
                  onChange={(value) => handleChange(index, "fin", value)}
                />
              </div>
            </div>
            <div>
              <MultiSelector
                value={sesion.instructores
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
                  handleChange(
                    index,
                    "instructores",
                    value.map((v) => v.id),
                  )
                }
                className="w-full"
                label="Instructores"
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                removeSesion(index);
              }}
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addSesion}>
        <Plus className="mr-2 h-4 w-4" /> Agregar sesión
      </Button>
    </div>
  );
}
