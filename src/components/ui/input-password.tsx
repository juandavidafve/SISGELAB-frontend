import { Icon } from "@iconify/react";
import { ComponentProps, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function InputPassword({ className, ...props }: ComponentProps<"input">) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={cn("relative", className)}>
      <Input type={hidden ? "password" : "text"} {...props} />
      {hidden ? (
        <Icon
          icon="iconamoon:eye"
          className="absolute top-1/2 size-6 right-2 -translate-y-1/2 cursor-pointer"
          onClick={() => setHidden(!hidden)}
        />
      ) : (
        <Icon
          icon="iconamoon:eye-off"
          className="absolute top-1/2 size-6 right-2 -translate-y-1/2 cursor-pointer"
          onClick={() => setHidden(!hidden)}
        />
      )}
    </div>
  );
}

export { InputPassword };
