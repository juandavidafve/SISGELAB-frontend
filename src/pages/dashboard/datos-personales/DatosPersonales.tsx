import { Icon } from "@iconify/react";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import useAuth from "@/hooks/useAuth";
import {
  convertToFormInput as convertDatosPersonalesToFormInput,
  DatosPersonalesFormOutput,
  UpdatePassword,
} from "@/schemas/datos-personales";
import {
  get as getDatosPersonales,
  update as updateDatosPersonales,
} from "@/services/datos-personales";

import DatosPersonalesForm from "./components/DatosPersonalesForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

export default function DatosPersonales() {
  const { auth } = useAuth();
  const [openPassword, setOpenPassword] = useState(false);
  const { result: datosPersonales, execute: refreshDatosPersonales } =
    useAsyncWithToken(getDatosPersonales, []);

  async function handleUpdate(datosPersonales: DatosPersonalesFormOutput) {
    await updateDatosPersonales(datosPersonales);

    toast.success("Datos actualizados correctamente");
    refreshDatosPersonales();
  }

  async function handlePasswordUpdate(data: UpdatePassword) {
    if (!auth.currentUser) return;

    await updatePassword(auth.currentUser, data.password);
    toast.success("Contraseña actualizada correctamente");
    setOpenPassword(false);
  }

  if (!datosPersonales) return;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Datos personales</h1>

        <Dialog open={openPassword} onOpenChange={setOpenPassword}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon icon="material-symbols:more-horiz" className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <DialogTrigger>Cambiar Contraseña</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modificar Contraseña</DialogTitle>
            </DialogHeader>
            <UpdatePasswordForm onSubmit={handlePasswordUpdate} />
          </DialogContent>
        </Dialog>
      </div>

      <DatosPersonalesForm
        onSubmit={handleUpdate}
        defaultValues={convertDatosPersonalesToFormInput(datosPersonales)}
      />
    </>
  );
}
