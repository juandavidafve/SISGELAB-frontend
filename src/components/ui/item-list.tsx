import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

// Ajusta la ruta si es distinta

interface ItemListProps<T> {
  label: string;
  valueLabel: keyof T;
  value: T[];
  options: T[];
  onChange: (value: T[]) => void;
  className?: string;
}

export default function ItemList<T>({
  label,
  valueLabel,
  value,
  options,
  onChange,
  className,
}: ItemListProps<T>) {
  const [avalableOptions, setAvailableOptions] = useState<T[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  function handleAdd() {
    if (selectedValue === null) return;
    const currentOpt = avalableOptions[selectedValue];
    if (!currentOpt) return;

    setAvailableOptions(
      avalableOptions.filter((_, index) => index !== selectedValue),
    );

    onChange([...value, currentOpt]);
    setSelectedValue(null);
  }

  function handleRemove(index: number) {
    const currentOpt = value[index];
    if (!currentOpt) return;

    setAvailableOptions([...avalableOptions, currentOpt]);

    onChange(value.filter((_, i) => i !== index));
  }

  function updateAvailableOptions() {
    setAvailableOptions(
      options.filter((option) => {
        const foundOpt = value.find(
          (val) => option[valueLabel] === val[valueLabel],
        );
        return foundOpt === undefined;
      }),
    );
  }

  useEffect(() => {
    updateAvailableOptions();
  }, [value, options]);

  return (
    <div className={className}>
      <div>
        <Label htmlFor="item-combobox">{label}</Label>
        <div className="mt-1 grid grid-cols-[auto_1fr] gap-2">
          <Combobox
            value={selectedValue}
            onChange={setSelectedValue}
            items={avalableOptions.map((item) => item[valueLabel] as string)}
            searchPlaceholder="Buscar..."
            comboboxPlaceholder="Selecciona un valor"
            notFoundText="No se encontraron resultados"
            width="w-lg"
          />
          <Button onClick={handleAdd} className="font-bold">
            Agregar
          </Button>
        </div>
      </div>

      <ul className="mt-1 flex flex-col gap-1">
        {value.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-2.5 rounded-md border pl-4 shadow-xs"
          >
            <span>{String(item[valueLabel])}</span>
            <Button
              onClick={() => handleRemove(index)}
              variant="ghost"
              size="icon"
            >
              <Icon icon="mdi:close" className="size-6 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
