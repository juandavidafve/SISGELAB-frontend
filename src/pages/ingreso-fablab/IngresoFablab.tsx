import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import TablaIngresos from "./tabla-ingresos";

export default function FabLabIngresoTable() {
  const apiUrl = ""; // URL real que usará el backend
  const enlaceFormulario = "https://www.google.com"; // Enlace de prueba
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enlaceFormulario);
      alert("Enlace copiado al portapapeles.");
    } catch {
      alert("Error al copiar el enlace.");
    }
  };

  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ingreso al FabLab</h1>
        <Button onClick={() => setShowQR(true)}>Enlace Formulario</Button>
      </div>

      {/* Tabla de ingresos */}
      <TablaIngresos apiUrl={apiUrl} />

      {/* Modal QR */}
      {showQR && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-[90%] max-w-md rounded-xl bg-white p-6 text-center shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">
              Escanea el QR o copia el enlace
            </h2>
            <QRCodeCanvas
              value={enlaceFormulario}
              size={160}
              className="mx-auto mb-4"
            />
            <p className="mb-4 text-sm break-all text-blue-600">
              {enlaceFormulario}
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={copyToClipboard}>Copiar enlace</Button>
              <Button variant="secondary" onClick={() => setShowQR(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
