import axios from "axios";
import { useState, useEffect } from "react";

interface Ingreso {
  id: number;
  instructor: string;
  fecha: string;
  tipo: string;
}

interface TablaIngresosProps {
  apiUrl: string;
}

export default function TablaIngresos({ apiUrl }: TablaIngresosProps) {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Llamada a la API
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        // Mapea la respuesta para que coincida con la estructura esperada
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData = response.data.map((ingreso: any) => ({
          id: ingreso.id,
          instructor: ingreso.usuario, // Mapeamos 'usuario' a 'instructor'
          fecha: ingreso.fecha,
          tipo: ingreso.motivo, // Mapeamos 'motivo' a 'tipo'
        }));
        setIngresos(mappedData); // Establecemos los datos mapeados en el estado
      })
      .catch((err) => {
        console.error("Error al obtener los datos", err);
      });
  }, [apiUrl]);

  // Cálculo de paginación
  const totalItems = ingresos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = ingresos.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-md bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Instructor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Fecha y Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Tipo
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentItems.map((ingreso) => (
            <tr key={ingreso.id}>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {ingreso.id}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {ingreso.instructor}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {ingreso.fecha}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {ingreso.tipo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700">
            Mostrar filas por página:
          </span>
          <select
            className="rounded-md border px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="text-sm text-gray-700">
          {startIndex + 1}-{endIndex} de {totalItems}
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="rounded-md border p-1 text-gray-400 hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          <button
            className="rounded-md border p-1 text-gray-400 hover:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
