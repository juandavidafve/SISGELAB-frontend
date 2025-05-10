import { Icon } from "@iconify/react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
}

export default function QrDialog({ url }: QrDialogProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado al portapapeles.");
    } catch {
      toast.error("Error al copiar el enlace.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Enlace Formulario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Escanea el QR o copia el enlace
          </DialogTitle>
        </DialogHeader>
        <QRCodeCanvas value={url} size={160} className="mx-auto mb-4" />

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <Button size="icon" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Icon
              className="size-6"
              icon="material-symbols:content-copy-outline-rounded"
            />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
