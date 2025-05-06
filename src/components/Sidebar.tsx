import { Icon } from "@iconify/react";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const AdminSidebar: FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  function handleClick() {
    setCollapsed(true);
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

          <div
            className={cn(
              "flex gap-2 transition-opacity",
              collapsed && "lg:opacity-0",
            )}
          >
            <span className="font-bold">ADMIN</span>
            <Icon icon="mingcute:user-4-fill" className="size-6" />
          </div>
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
              onClick={handleClick}
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
};

export default AdminSidebar;
