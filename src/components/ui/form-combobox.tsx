import { Control, FieldValues, Path } from "react-hook-form";

import { Combobox } from "./combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface FormComboboxProps<T extends FieldValues, U> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
  items: U[];
  itemLabel: keyof U;
  itemValue: keyof U;
}

export default function FormCombobox<T extends FieldValues, U>({
  name,
  control,
  label,
  items,
  itemLabel,
  itemValue,
}: FormComboboxProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Combobox
              value={items.find((item) => item[itemValue] === field.value)}
              items={items}
              itemLabel={(item) => String(item[itemLabel])}
              itemValue={(item) => {
                const valStr = String(item[itemValue]);
                const valNum = parseInt(valStr);

                return isNaN(valNum) ? valStr : valNum;
              }}
              onChange={(item) => item && field.onChange(item[itemValue])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
