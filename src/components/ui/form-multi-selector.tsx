import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "./form";
import MultiSelector from "./multi-selector";

interface Props<T extends FieldValues, U> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
  items: U[];
  itemLabel: keyof U | ((item: U) => string);
  itemValue: keyof U;
}

export default function FormMultiSelector<T extends FieldValues, U>({
  name,
  control,
  label,
  items,
  itemLabel,
  itemValue,
}: Props<T, U>) {
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
          <FormControl>
            <MultiSelector
              value={field.value
                .map((id: U | U[keyof U]) =>
                  items.find((item) => getItemValue(item) === id),
                )
                .filter((item: U) => item !== undefined)}
              items={items}
              itemLabel={(item) => String(getItemLabel(item))}
              itemValue={(item) => String(getItemValue(item))}
              onChange={(value) =>
                field.onChange(value.map((v) => getItemValue(v)))
              }
              className="w-full"
              label={label || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
