import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { InputDate } from "./input-date";

interface FormInputDateProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
}

export default function FormInputDate<T extends FieldValues>({
  name,
  control,
  label,
}: FormInputDateProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputDate {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
