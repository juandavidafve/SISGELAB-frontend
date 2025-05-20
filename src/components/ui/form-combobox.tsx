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
  itemLabel: keyof U | ((item: U) => string);
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
  function getItemValue(item: U) {
    return itemValue ? item[itemValue] : item;
  }

  function getItemLabel(item: U) {
    if (typeof itemLabel === "string" || typeof itemLabel === "number") {
      return item[itemLabel];
    }

    if (typeof itemLabel === "function") {
      return itemLabel(item);
    }

    return item;
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Combobox
              value={items.find((item) => getItemValue(item) === field.value)}
              items={items}
              itemLabel={(item) => String(getItemLabel(item))}
              itemValue={(item) => {
                const valStr = String(getItemValue(item));
                const valNum = parseInt(valStr);

                return isNaN(valNum) ? valStr : valNum;
              }}
              onChange={(item) => item && field.onChange(getItemValue(item))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
