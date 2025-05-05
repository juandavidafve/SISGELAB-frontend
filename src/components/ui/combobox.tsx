"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import * as React from "react";

interface ComboboxProps {
  items: string[];
  value: number | null;
  onChange: (value: number | null) => void;
  searchPlaceholder: string;
  comboboxPlaceholder: string;
  notFoundText: string;
  width?: string;
}

export function Combobox({
  items,
  value,
  onChange,
  searchPlaceholder,
  comboboxPlaceholder,
  notFoundText,
  width = "w-[200px]",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(width, "justify-between")}
        >
          {value !== null ? items[value] : comboboxPlaceholder}
          <Icon
            icon="material-symbols:expand-all-rounded"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(width, "p-0")}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {items.map((item, index) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    onChange(index == value ? null : index);
                    setOpen(false);
                  }}
                >
                  <Icon
                    icon="material-symbols:check-rounded"
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === index ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
