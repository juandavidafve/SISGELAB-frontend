"use client";

import { Icon } from "@iconify/react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface InputDateProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function InputDate({ value, onChange }: InputDateProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            "flex justify-between",
          )}
        >
          {value ? (
            format(value, "dd/MM/yyyy")
          ) : (
            <span>Selecciona una fecha</span>
          )}
          <Icon
            icon="material-symbols:calendar-month-outline-rounded"
            className="size-6"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={value}
          onSelect={onChange}
          initialFocus
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
