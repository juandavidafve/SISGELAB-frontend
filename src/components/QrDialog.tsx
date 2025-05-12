import { Icon } from "@iconify/react";
import { QRCodeCanvas } from "qrcode.react";
import { ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrDialogProps {
  url: string;
  children: ReactNode;
}

export default function QrDialog({ url, children }: QrDialogProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado al portapapeles.");
    } catch {
      toast.error("Error al copiar el enlace.");
    }
  };

  const handleDownloadQrCode = () => {
    const canvas = document.getElementById(
      "qr-code-download",
    ) as HTMLCanvasElement | null;

    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Escanea el QR o copia el enlace
          </DialogTitle>
        </DialogHeader>

        <QRCodeCanvas
          id="qr-code-download"
          value={url}
          size={160}
          className="mx-auto mb-4"
          marginSize={2}
        />

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <Button size="icon" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copiar</span>
            <Icon
              className="size-6"
              icon="material-symbols:content-copy-outline-rounded"
            />
          </Button>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleDownloadQrCode}>
            Descargar QR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
