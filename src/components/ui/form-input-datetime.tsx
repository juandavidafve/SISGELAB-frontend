import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { InputDateTime } from "./input-datetime";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
}

export default function FormInputDateTime<T extends FieldValues>({
  name,
  control,
  label,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputDateTime {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
