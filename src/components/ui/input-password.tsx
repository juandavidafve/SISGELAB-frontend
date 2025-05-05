import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";

function InputPassword() {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="relative">
      <Input type={hidden ? "password" : "text"} />
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
