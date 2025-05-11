import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { InputNumber } from "@/components/ui/input-number";
import SelectIdName from "@/components/ui/select-id-name";
import {
  OfertaFormacionFormInput,
  OfertaFormacionFormOutput,
  OfertaFormacionFormSchema,
} from "@/schemas/oferta-formacion";

import SesionForm from "./SesionForm";

interface OfertaFormacionFormProps {
  onSubmit: (oferta: OfertaFormacionFormOutput) => void;
}

export default function OfertaFormacionForm({
  onSubmit,
}: OfertaFormacionFormProps) {
  const form = useForm<
    OfertaFormacionFormInput,
    unknown,
    OfertaFormacionFormOutput
  >({
    resolver: zodResolver(OfertaFormacionFormSchema),
    defaultValues: {
      nombre: "",
      codigo: "",
      cine: "",
      extension: false,
      horas: 0,
      semestre: 0,
      valor: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      id_tipo: undefined,
      id_categoria: undefined,
      id_tipo_beneficiario: undefined,
      cupo_maximo: 0,
      id_institucion: 0,
      sesiones: [
        {
          fecha: new Date(),
          inicio: "00:00",
          fin: "00:00",
          id_sala: 0,
          instructores: [],
        },
      ],
    },
  });

  const instituciones = [
    {
      id: 23,
      nombre: "Institucion 1",
    },
    {
      id: 56,
      nombre: "Institucion 2",
    },
    {
      id: 75,
      nombre: "Institucion 3",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CINE</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extension"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Es extensión?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha_inicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de inicio</FormLabel>
              <FormControl>
                <InputDate value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de fin</FormLabel>
              <FormControl>
                <InputDate value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horas</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semestre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semestre</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de oferta</FormLabel>
              <SelectIdName
                {...field}
                items={[
                  {
                    id: 1,
                    nombre: "AAAA",
                  },
                ]}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <SelectIdName
                  {...field}
                  items={[
                    {
                      id: 1,
                      nombre: "AAAA",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_tipo_beneficiario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de beneficiario</FormLabel>
              <FormControl>
                <SelectIdName
                  {...field}
                  items={[
                    {
                      id: 1,
                      nombre: "AAAA",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cupo_maximo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cupo máximo</FormLabel>
              <FormControl>
                <InputNumber {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_institucion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institución</FormLabel>
              <FormControl>
                <Combobox
                  value={instituciones.find(
                    (institucion) => institucion.id === field.value,
                  )}
                  items={instituciones}
                  itemLabel={(institucion) => institucion.nombre}
                  itemValue={(institucion) => institucion.id}
                  onChange={(institucion) => field.onChange(institucion?.id)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sesiones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sesiones</FormLabel>
              <FormControl>
                <SesionForm {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Crear
        </Button>
      </form>
    </Form>
  );
}
