import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  value,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      value={value || ""}
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border-2 border-neutral-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-neutral-600 selection:text-neutral-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-500/20",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
