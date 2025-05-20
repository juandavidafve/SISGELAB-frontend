import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function Loader({ className }: Props) {
  return (
    <Icon
      className={cn("size-12 text-red-500", className)}
      icon="line-md:loading-twotone-loop"
    />
  );
}
