"use client";

import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function InputDate() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            "flex justify-between",
          )}
        >
          {date ? (
            format(date, "PPP", {
              locale: es,
            })
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
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
