import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { InputNumber } from "./input-number";

interface FormInputNumberProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
}

export default function FormInputNumber<T extends FieldValues>({
  name,
  control,
  label,
}: FormInputNumberProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputNumber {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
