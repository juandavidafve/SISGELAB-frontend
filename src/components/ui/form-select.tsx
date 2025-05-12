import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface FormSelectProps<T extends FieldValues, U> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
  items: U[];
  itemLabel: keyof U;
  itemValue: keyof U;
}

export default function FormSelect<T extends FieldValues, U>({
  name,
  control,
  label,
  items,
  itemLabel,
  itemValue,
}: FormSelectProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(value) => {
                const valNum = parseInt(value);
                field.onChange(isNaN(valNum) ? value : valNum);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem
                    key={String(item[itemValue])}
                    value={String(item[itemValue])}
                  >
                    {String(item[itemLabel])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
