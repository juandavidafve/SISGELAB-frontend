import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OfertaFormacion } from "@/schemas/oferta-formacion";

interface Props {
  className?: string;
  estado: OfertaFormacion["estado"];
}

export default function BadgeEstado({
  estado,
  className,
  ...props
}: React.ComponentProps<"span"> & Props) {
  return (
    <Badge
      className={cn(
        "w-28",
        estado === "ACTIVA" && "bg-green-200 text-green-800",
        estado === "INACTIVA" && "bg-red-200 text-red-800",
        estado === "FINALIZADA" && "bg-neutral-200 text-neutral-800",
        className,
      )}
      {...props}
    >
      {estado}
    </Badge>
  );
}
