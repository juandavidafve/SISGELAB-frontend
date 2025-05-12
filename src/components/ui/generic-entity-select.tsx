import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseEntity } from "@/schemas/generic";

interface GenericEntitySelectProps {
  value?: number;
  onChange: (value: number) => void;
  items: BaseEntity[];
}

export default function GenericEntitySelect({
  items,
  value,
  onChange,
}: GenericEntitySelectProps) {
  return (
    <Select
      defaultValue={value !== undefined ? String(value) : undefined}
      onValueChange={(val) => onChange(parseInt(val))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccionar..." />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
