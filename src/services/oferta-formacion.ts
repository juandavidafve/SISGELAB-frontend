import { api } from "@/lib/axios";
import { urlMerge } from "@/lib/utils";
import {
  OfertaFormacionMinimalSchema,
  OfertaFormacionSchema,
} from "@/schemas/oferta-formacion";

const base = "/ofertas/";

export async function get() {
  const req = await api.get(base);

  req.data = [
    {
      id: 0,
      nombre: "Grabado CNC",
      estado: "ACTIVA",
    },
    {
      id: 1,
      nombre: "NO C",
      estado: "INACTIVA",
    },
  ];

  return OfertaFormacionMinimalSchema.array().parse(req.data);
}

export async function getById(id: number) {
  const req = {}; // await api.get(urlMerge(base, id));

  req.data = {
    id: 1,
    nombre: "Curso de Programación Web",
    codigo: "CPW-2025",
    cine: "Informática",
    extension: true,
    estado: "ACTIVA",
    fecha_inicio: "2025-06-01",
    fecha_fin: "2025-08-31",
    horas: 120,
    tipo_oferta: {
      id: 1,
      nombre: "Curso Técnico",
    },
    categoria: {
      id: 2,
      nombre: "Tecnología",
    },
    tipo_beneficiario: {
      id: 3,
      nombre: "Estudiantes Universitarios",
    },
    semestre: 2,
    valor: 500000,
    pieza_grafica: "https://placehold.co/6000x4000/EEE/31343C",
    institucion: {
      id: 4,
      nombre: "Instituto Tecnológico Nacional",
      tipoInstitucion: "Universidad",
    },
    sesiones: [
      {
        id: 1,
        nombre: "Sesión 1 - Introducción",
        fecha: "2025-06-03",
        inicio: "09:00",
        fin: "12:00",
        sala: {
          id: 10,
          nombre: "Sala A",
        },
      },
      {
        id: 2,
        nombre: "Sesión 2 - HTML y CSS",
        fecha: "2025-06-05",
        inicio: "09:00",
        fin: "12:00",
        sala: {
          id: 10,
          nombre: "Sala A",
        },
      },
    ],
    inscritos: [
      {
        id: 101,
        nombre: "Juan Pérez",
      },
      {
        id: 102,
        nombre: "María García",
      },
    ],
  };

  return OfertaFormacionSchema.parse(req.data);
}
