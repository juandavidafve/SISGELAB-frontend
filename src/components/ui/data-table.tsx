"use client";

import { Icon } from "@iconify/react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DataTableFilter } from "./data-table-filter";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "number";
  }
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DataTableFilter table={table} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin Resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  function handleSort(dir: "asc" | "desc") {
    if (column.getIsSorted() === dir) {
      column.clearSorting();
      return;
    }

    column.toggleSorting(dir === "desc");
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() && (
              <>
                {column.getIsSorted() === "desc" ? (
                  <Icon icon="material-symbols:arrow-downward-rounded" />
                ) : column.getIsSorted() === "asc" ? (
                  <Icon icon="material-symbols:arrow-upward-rounded" />
                ) : (
                  <Icon icon="fluent:chevron-up-down-24-filled" />
                )}
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => handleSort("asc")}>
                <Icon
                  icon="material-symbols:arrow-upward-rounded"
                  className="h-3.5 w-3.5 text-muted-foreground/70"
                />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("desc")}>
                <Icon
                  icon="material-symbols:arrow-downward-rounded"
                  className="h-3.5 w-3.5 text-muted-foreground/70"
                />
                Desc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Icon
              icon="iconamoon:eye-off"
              className="h-3.5 w-3.5 text-muted-foreground/70"
            />
            Ocultar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numEqualsFilter: FilterFn<any> = (
  row,
  columnId,
  filterValue: string,
) => {
  const cellValue = row.getValue<number>(columnId);

  const numFilterValue = parseInt(filterValue);

  if (isNaN(numFilterValue)) return false;

  return cellValue === numFilterValue;
};
