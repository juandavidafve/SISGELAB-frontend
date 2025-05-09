"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

// Definición de tipos
interface Pais {
  id: number;
  nombre: string;
}

interface Municipio {
  id: number;
  nombre: string;
}

interface Modalidad {
  id: number;
  nombre: string;
}

interface DatosPersonales {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  id_tipo_documento: number;
  documento: string;
  fecha_expedicion: string;
  sexo: string;
  fecha_nacimiento: string;
  pais: Pais;
  municipio: Municipio;
  telefono: string;
  correo_personal: string;
  direccion: string;
  entidad: string;
  modalidad: Modalidad;
  activo: boolean;
}

// Opciones para los selectores
const tiposDocumento = ["CC", "TI", "CE", "PA"];
const opcionesSexo = ["Masculino", "Femenino", "Otro"];
const opcionesPoblacion = [
  "Ninguna",
  "Indígena",
  "Afrocolombiano",
  "Rom",
  "Raizal",
  "Palenquero",
];

export default function DatosPersonalesForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState<DatosPersonales | null>(null);

  // Función para cargar los datos personales
  const cargarDatosPersonales = async () => {
    try {
      setLoading(true);

      const response = await fetch("/datos-personales");

      if (!response.ok) {
        throw new Error(`Error al cargar los datos: ${response.status}`);
      }

      const data = await response.json();

      // Formateamos la fecha de nacimiento para el input
      let fechaNacimiento = "";
      if (data.fecha_nacimiento) {
        try {
          const date = new Date(data.fecha_nacimiento);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          fechaNacimiento = `${day}/${month}/${year}`;
        } catch (e) {
          console.error("Error al formatear fecha de nacimiento:", e);
          fechaNacimiento = data.fecha_nacimiento;
        }
      }

      setDatos({
        ...data,
        fecha_nacimiento: fechaNacimiento,
      });

      setError(null);
    } catch (err) {
      setError("Error al cargar los datos. Por favor, intente nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosPersonales();
  }, []);

  // Función para combinar nombres y apellidos
  const getNombreCompleto = () => {
    if (!datos) return "";

    const nombres = [datos.primer_nombre, datos.segundo_nombre]
      .filter(Boolean)
      .join(" ");
    const apellidos = [datos.primer_apellido, datos.segundo_apellido]
      .filter(Boolean)
      .join(" ");
    return `${nombres} ${apellidos}`.trim();
  };

  // Manejador para actualizar los datos
  const handleInputChange = (field: string, value: any) => {
    if (!datos) return;

    if (field === "nombreCompleto") {
      // Separar el nombre completo en sus componentes
      const nombres = value.trim().split(" ");

      if (nombres.length === 1) {
        // Solo hay un nombre
        setDatos({
          ...datos,
          primer_nombre: nombres[0] || "",
          segundo_nombre: "",
          primer_apellido: "",
          segundo_apellido: "",
        });
      } else if (nombres.length === 2) {
        // Nombre y apellido
        setDatos({
          ...datos,
          primer_nombre: nombres[0] || "",
          segundo_nombre: "",
          primer_apellido: nombres[1] || "",
          segundo_apellido: "",
        });
      } else if (nombres.length === 3) {
        // Nombre y dos apellidos o dos nombres y un apellido
        setDatos({
          ...datos,
          primer_nombre: nombres[0] || "",
          segundo_nombre: "",
          primer_apellido: nombres[1] || "",
          segundo_apellido: nombres[2] || "",
        });
      } else if (nombres.length >= 4) {
        // Dos nombres y dos apellidos
        setDatos({
          ...datos,
          primer_nombre: nombres[0] || "",
          segundo_nombre: nombres[1] || "",
          primer_apellido: nombres[2] || "",
          segundo_apellido: nombres.slice(3).join(" ") || "",
        });
      }
    } else if (field === "sexo") {
      setDatos({
        ...datos,
        sexo: value.toLowerCase(),
      });
    } else {
      setDatos({
        ...datos,
        [field]: value,
      });
    }
  };

  // Manejador para guardar los datos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/datos-personales", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar: ${response.status}`);
      }

      alert("Datos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos. Por favor, intente nuevamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin">
          <Icon icon="material-symbols:progress-activity" className="h-8 w-8" />
        </div>
        <span className="ml-2">Cargando datos personales...</span>
      </div>
    );
  }

  if (error || !datos) {
    return (
      <div className="mb-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon
              icon="material-symbols:error"
              className="h-5 w-5 text-red-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {error || "No se pudieron cargar los datos"}
            </h3>
            <button
              className="mt-2 text-sm text-red-700 underline"
              onClick={() => cargarDatosPersonales()}
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-2xl font-bold">Datos Personales</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nombreCompleto"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Nombres y Apellidos
          </label>
          <Input
            id="nombreCompleto"
            value={getNombreCompleto()}
            onChange={(e) =>
              handleInputChange("nombreCompleto", e.target.value)
            }
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="tipoDocumento"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              Documento de identidad
            </label>
            <Combobox
              items={tiposDocumento}
              value={
                datos.id_tipo_documento ? datos.id_tipo_documento - 1 : null
              }
              onChange={(value) =>
                handleInputChange(
                  "id_tipo_documento",
                  value !== null ? value + 1 : null,
                )
              }
              searchPlaceholder="Buscar..."
              comboboxPlaceholder="CC"
              notFoundText="No encontrado"
              width="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="documento"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              &nbsp;
            </label>
            <Input
              id="documento"
              value={datos.documento}
              onChange={(e) => handleInputChange("documento", e.target.value)}
              className="w-full"
              placeholder="1234567890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="sexo"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              Género
            </label>
            <Combobox
              items={opcionesSexo}
              value={opcionesSexo.findIndex(
                (s) => s.toLowerCase() === datos.sexo.toLowerCase(),
              )}
              onChange={(value) =>
                handleInputChange(
                  "sexo",
                  value !== null ? opcionesSexo[value] : "",
                )
              }
              searchPlaceholder="Buscar..."
              comboboxPlaceholder="Seleccionar"
              notFoundText="No encontrado"
              width="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="fechaNacimiento"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              Fecha de nacimiento
            </label>
            <div className="relative">
              <Input
                id="fechaNacimiento"
                value={datos.fecha_nacimiento}
                onChange={(e) =>
                  handleInputChange("fecha_nacimiento", e.target.value)
                }
                className="w-full pr-10"
                placeholder="DD/MM/AAAA"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Icon
                  icon="material-symbols:calendar-month"
                  className="h-5 w-5 text-neutral-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="correo"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Correo
          </label>
          <Input
            id="correo"
            type="email"
            value={datos.correo_personal}
            onChange={(e) =>
              handleInputChange("correo_personal", e.target.value)
            }
            className="w-full"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Celular
          </label>
          <Input
            id="telefono"
            value={datos.telefono}
            onChange={(e) => handleInputChange("telefono", e.target.value)}
            className="w-full"
            placeholder="1234567890"
          />
        </div>

        <div>
          <label
            htmlFor="poblacion"
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            Población Especial
          </label>
          <Combobox
            items={opcionesPoblacion}
            value={0} // Por defecto "Ninguna"
            onChange={(value) => console.log("Población seleccionada:", value)}
            searchPlaceholder="Buscar..."
            comboboxPlaceholder="Seleccionar"
            notFoundText="No encontrado"
            width="w-full"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
