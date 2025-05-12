import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectIdNameProps {
  value?: number;
  onChange: (value: number) => void;
  items: {
    id?: number;
    nombre: string;
  }[];
}

export default function SelectIdName({
  items,
  value,
  onChange,
}: SelectIdNameProps) {
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
