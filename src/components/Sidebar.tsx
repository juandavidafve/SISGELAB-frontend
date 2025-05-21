import { Icon } from "@iconify/react";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";

import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { UpdatePassword } from "@/schemas/datos-personales";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

interface NavItem {
  label: string;
  icon: string;
  url: string;
  show?: boolean;
}

export default function Sidebar() {
  const { auth, info, user } = useAuth();
  const { pathname } = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Datos Personales",
      icon: "material-symbols:database-outline",
      url: "datos-personales",
      show:
        info?.roles.includes("ROLE_PARTICIPANTE") ||
        info?.roles.includes("ROLE_INSTRUCTOR"),
    },
    {
      label: "Instructores",
      icon: "ph:chalkboard-teacher",
      url: "instructor",
      show: info?.roles.includes("ROLE_ADMINISTRADOR"),
    },
    {
      label: "Ofertas de Formación",
      icon: "material-symbols:menu-book-outline-rounded",
      url: "oferta-formacion",
    },
    {
      label: "Ingreso al FabLab",
      icon: "material-symbols:login-rounded",
      url: "ingreso-fablab",
      show:
        info?.roles.includes("ROLE_PARTICIPANTE") ||
        info?.roles.includes("ROLE_ADMINISTRADOR"),
    },
    {
      label: "Asistencia Instructores",
      icon: "material-symbols:list-alt-outline-rounded",
      url: "movimiento-instructor",
      show: info?.roles.includes("ROLE_ADMINISTRADOR"),
    },
    {
      label: "Certificados",
      icon: "lineicons:certificate-badge-1",
      url: "",
      show: false,
    },
    {
      label: "Reportes",
      icon: "material-symbols:docs-outline-rounded",
      url: "",
      show: false,
    },
    {
      label: "Datos",
      icon: "material-symbols:database-outline",
      url: "",
      show: false,
    },
  ];

  const currentItemPath = pathname.split("/")[2];
  const currentNavItem =
    currentItemPath?.length > 0
      ? navItems.find((item) => item.url === currentItemPath)
      : undefined;

  const [collapsed, setCollapsed] = useState(true);

  async function handleLogout() {
    await auth.signOut();
  }

  async function handlePasswordUpdate(data: UpdatePassword) {
    if (!user) return;

    if (data.currentPassword) {
      if (!user.email) return;
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
    }

    await updatePassword(user, data.password);
    toast.success("Contraseña actualizada correctamente");
  }

  return (
    <>
      {!collapsed && (
        <div
          className="fixed top-0 left-0 z-10 h-screen w-screen bg-neutral-950 opacity-30"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-10 w-full space-y-10 overflow-hidden bg-red-600 p-3 text-white transition-[height] lg:min-h-screen lg:transition-[width]",
          collapsed && "h-16 lg:w-16",
          !collapsed && "h-screen lg:w-64",
        )}
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon icon="mdi:menu" className="size-6" />
          </Button>

          <Dialog>
            <Popover>
              <PopoverTrigger
                className={cn(
                  "cursor-pointer transition-opacity",
                  collapsed && "lg:opacity-0",
                )}
              >
                <Icon icon="mingcute:user-4-fill" className="size-6" />
              </PopoverTrigger>
              <PopoverContent className="flex w-fit flex-col items-center">
                <p className="text-center font-bold">
                  {info?.nombre
                    .split(" ")
                    .filter((_, i) => i === 0 || i === 2)
                    .join(" ")}
                </p>
                {info?.roles.map((rol) => {
                  const roleMapping = new Map<typeof rol, string>();
                  roleMapping.set("ROLE_ADMINISTRADOR", "Administrador");
                  roleMapping.set("ROLE_INSTRUCTOR", "Instructor");
                  roleMapping.set("ROLE_PARTICIPANTE", "Participante");

                  return (
                    <p className="text-center text-sm" key={rol}>
                      {roleMapping.get(rol)}
                    </p>
                  );
                })}

                <Separator className="my-2" />

                <div className="flex flex-col gap-2">
                  {(info?.roles.includes("ROLE_INSTRUCTOR") ||
                    info?.roles.includes("ROLE_ADMINISTRADOR")) && (
                    <DialogTrigger asChild>
                      <Button variant="ghost">Cambiar Contraseña</Button>
                    </DialogTrigger>
                  )}

                  <Button variant="secondary" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modificar Contraseña</DialogTitle>
              </DialogHeader>
              <UpdatePasswordForm onSubmit={handlePasswordUpdate} />
            </DialogContent>
          </Dialog>
        </div>
        <nav className="flex h-full flex-col items-start gap-4 overflow-y-auto">
          {navItems.map(
            (item, index) =>
              item.show !== false && (
                <Link to={item.url} key={index}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start has-[>svg]:p-0",
                      currentNavItem === item &&
                        "bg-neutral-100 text-neutral-900",
                      collapsed && "w-9",
                    )}
                    onClick={() => {
                      setCollapsed(true);
                    }}
                  >
                    <Icon icon={item.icon} className="ml-[6px] size-6" />
                    <span
                      className={cn(
                        "mr-[6px] overflow-hidden transition-opacity",
                        collapsed && "opacity-0",
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                </Link>
              ),
          )}
        </nav>
      </aside>
    </>
  );
}
