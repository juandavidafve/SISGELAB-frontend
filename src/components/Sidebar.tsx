import { Icon } from "@iconify/react";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface NavItem {
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Instructores", icon: "ph:chalkboard-teacher" },
  {
    label: "Ofertas de Formación",
    icon: "material-symbols:menu-book-outline-rounded",
  },
  { label: "Ingreso al FabLab", icon: "material-symbols:login-rounded" },
  {
    label: "Asistencia Instructores",
    icon: "material-symbols:list-alt-outline-rounded",
  },
  { label: "Certificados", icon: "lineicons:certificate-badge-1" },
  { label: "Reportes", icon: "mdi:file-document" },
  { label: "Datos", icon: "mdi:database" },
];

export default function AdminSidebar() {
  const { auth } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  async function handleLogout() {
    await auth.signOut();
  }

  return (
    <>
      {!collapsed && (
        <div
          className="absolute top-0 left-0 h-screen w-screen bg-neutral-950 opacity-30"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 w-full space-y-10 overflow-hidden bg-red-600 p-3 text-white transition-[height] lg:min-h-screen lg:transition-[width]",
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

          <Popover>
            <PopoverTrigger
              className={cn(
                "cursor-pointer transition-opacity",
                collapsed && "lg:opacity-0",
              )}
            >
              <Icon icon="mingcute:user-4-fill" className="size-6" />
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <p className="text-center font-bold">Juan Afanador</p>
              <p className="text-center text-sm">ADMIN</p>
              <Separator className="my-4" />
              <Button variant="outline" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <nav className="flex h-full flex-col items-start gap-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-start has-[>svg]:p-0",
                collapsed && "w-9",
              )}
              onClick={() => {
                setCollapsed(true);
              }}
            >
              <Icon icon={item.icon} className="ml-[6px] size-6" />
              <span
                className={cn(
                  "overflow-hidden transition-opacity",
                  collapsed && "opacity-0",
                )}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  );
}
