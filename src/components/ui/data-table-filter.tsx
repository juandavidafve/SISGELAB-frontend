import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Column, Table } from "@tanstack/react-table";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableFilterProps<T> {
  table: Table<T>;
}

export function DataTableFilter<T>({ table }: DataTableFilterProps<T>) {
  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter());

  if (filterableColumns.length === 0) return;

  function handleFilterCreate(values: z.infer<typeof filterCreateFormSchema>) {
    table.getColumn(values.column)?.setFilterValue(values.value);
  }

  const availableColumns = filterableColumns.filter(
    (column) => !column.getIsFiltered(),
  );

  return (
    <div className="flex flex-wrap gap-2">
      {table.getAllColumns().map((column) => {
        if (!column.getIsFiltered()) return;

        return (
          <Popover key={column.id}>
            <PopoverTrigger>
              <Badge variant="outline">
                {column.id}:{" "}
                {String(column.getFilterValue()).replace(
                  /(?<=.{15}).+$/, // Only show 15 chars
                  "...",
                )}
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="relative">
              <Button
                variant="ghost"
                className="absolute top-3 right-3 size-6"
                onClick={() => column.setFilterValue("")}
              >
                <Icon
                  icon="material-symbols:delete-outline-rounded"
                  className="size-4"
                />
              </Button>

              <FilterCreateForm
                defaultValues={{
                  column: column.id,
                  value: String(column.getFilterValue()),
                }}
                columns={table.getAllColumns()}
                onSubmit={handleFilterCreate}
              />
            </PopoverContent>
          </Popover>
        );
      })}

      {availableColumns.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              Agregar Filtro
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <FilterCreateForm
              columns={availableColumns}
              onSubmit={handleFilterCreate}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

const filterCreateFormSchema = z.object({
  column: z.string().nonempty("Selecciona una columna"),
  value: z.string(),
});

interface FilterCreateFormProps<T> {
  defaultValues?: z.infer<typeof filterCreateFormSchema>;
  columns: Column<T>[];
  onSubmit: (values: z.infer<typeof filterCreateFormSchema>) => void;
}

function FilterCreateForm<T>({
  onSubmit,
  columns,
  defaultValues = { column: "", value: "" },
}: FilterCreateFormProps<T>) {
  const form = useForm<z.infer<typeof filterCreateFormSchema>>({
    resolver: zodResolver(filterCreateFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (
      form.getValues("column") !== defaultValues.column ||
      form.getValues("value") !== defaultValues.value
    ) {
      form.reset(defaultValues);
    }
  }, [defaultValues.column, defaultValues.value]);

  function handleSubmit(values: z.infer<typeof filterCreateFormSchema>) {
    form.reset();
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="column"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Columna</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={defaultValues.column.length > 0}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {columns.map((column) => {
                    return (
                      <SelectItem key={column.id} value={column.id}>
                        {column.id}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filtro</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={
                    columns.find(
                      (column) => column.id === form.getValues().column,
                    )?.columnDef.meta?.filterVariant || "text"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
