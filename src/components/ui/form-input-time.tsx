import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { InputTime } from "./input-time";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, unknown, FieldValues>;
  label?: string;
}

export default function FormInputTime<T extends FieldValues>({
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
            <InputTime value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
