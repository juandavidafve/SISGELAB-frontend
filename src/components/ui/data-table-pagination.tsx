import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageSizeOptions = [10, 20, 30, 40, 50];

  useEffect(() => {
    table.setPageSize(Math.min(pageSizeOptions[0], table.getRowCount()));
  }, [table.getRowCount()]);

  if (table.getRowCount() === 0) return;

  return (
    <div className="my-2 flex items-center space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Filas por página</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-24">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions
              .filter((e) => e < table.getRowCount())
              .map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            <SelectItem
              key={table.getRowCount()}
              value={`${table.getRowCount()}`}
            >
              Todos
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir a la primera página</span>
          <Icon icon="material-symbols:keyboard-double-arrow-left-rounded" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir a la página anterior</span>
          <Icon icon="material-symbols:chevron-left-rounded" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir a la siguiente página</span>
          <Icon icon="material-symbols:chevron-right-rounded" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir a la última página</span>
          <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" />
        </Button>
      </div>
    </div>
  );
}
