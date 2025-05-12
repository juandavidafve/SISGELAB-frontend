import { BaseEntity } from "@/schemas/generic";

import { Combobox } from "./combobox";

interface GenericEntityComboboxProps {
  value?: number;
  onChange: (value: number) => void;
  items: BaseEntity[];
}

export default function GenericEntityCombobox({
  items,
  value,
  onChange,
}: GenericEntityComboboxProps) {
  return (
    <Combobox
      value={items.find((item) => item.id === value)}
      items={items}
      itemLabel={(item) => item.nombre}
      itemValue={(item) => item.id}
      onChange={(item) => item && onChange(item.id)}
    />
  );
}
