import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/ui/button";

interface ModalQRCodeProps {
  url: string;
  visible: boolean;
  onClose: () => void;
}

export default function ModalQRCode({
  url,
  visible,
  onClose,
}: ModalQRCodeProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Enlace copiado al portapapeles.");
    } catch {
      alert("Error al copiar el enlace.");
    }
  };

  if (!visible) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Escanea el QR o copia el enlace
        </h2>
        <QRCodeCanvas value={url} size={160} className="mx-auto mb-4" />
        <p className="mb-4 break-all text-blue-600">{url}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={copyToClipboard}>Copiar enlace</Button>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
