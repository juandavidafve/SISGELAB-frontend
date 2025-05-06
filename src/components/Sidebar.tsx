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
          className="absolute top-0 left-0 w-screen h-screen bg-neutral-950 opacity-30"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <aside
        className={cn(
          "w-full bg-red-600 text-white space-y-10 p-3 transition-[height] lg:transition-[width] lg:min-h-screen fixed top-0 left-0 overflow-hidden",
          collapsed && "lg:w-16 h-16",
          !collapsed && "lg:w-64 h-screen",
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
        <nav className="flex flex-col gap-4 items-start h-full overflow-y-auto">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "justify-start w-full has-[>svg]:p-0",
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
