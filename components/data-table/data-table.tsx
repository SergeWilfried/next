"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { DownloadIcon } from "@radix-ui/react-icons"
import { CsvImporter } from "../dropzone/csv-importer"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  pageCount: number,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
}: DataTableProps<TData, TValue>) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // search params
  const page = searchParams?.get("page") ?? "1" // default is page: 1
  const per_page = searchParams?.get("per_page") ?? "10" // default 5 record per page

    // create query string
    const createQueryString = React.useCallback(
        (params: Record<string, string | number | null>) => {
          const newSearchParams = new URLSearchParams(searchParams?.toString())
    
          for (const [key, value] of Object.entries(params)) {
            if (value === null) {
              newSearchParams.delete(key)
            } else {
              newSearchParams.set(key, String(value))
            }
          }
    
          return newSearchParams.toString()
        },
        [searchParams]
      )
    
      // handle server-side pagination
      const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
          pageIndex: Number(page) - 1,
          pageSize: Number(per_page),
        })
    
      const pagination = React.useMemo(
        () => ({
          pageIndex,
          pageSize,
        }),
        [pageIndex, pageSize]
      )
    
      React.useEffect(() => {
        setPagination({
          pageIndex: Number(page) - 1,
          pageSize: Number(per_page),
        })
      }, [page, per_page])
    
       // changed the route as well
      React.useEffect(() => {
        router.push(
          `${pathname}?${createQueryString({
            page: pageIndex + 1,
            per_page: pageSize,
          })}`
        )
  }, [pageIndex, pageSize])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [setData] = React.useState<TData[]>(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  })

  // Add this function to handle export
  const handleExport = () => {
    // Implement your export logic here
    console.log("Exporting data...")
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex space-x-2">
          <CsvImporter
            fields={columns.map(col => ({
              label: String(col.header),
              value: String(col.id),
              required: true
            }))}
            onImport={(parsedData) => {
              const formattedData = parsedData.map((item): TData => {
                const newItem: Partial<TData> = {};
                for (const key in item) {
                  if (Object.prototype.hasOwnProperty.call(item, key)) {
                    (newItem as any)[key] = item[key];
                  }
                }
                return newItem as TData;
              })
              // TODO: add data to table
            }}
            className="self-end"
          />
          <Button variant="outline" onClick={handleExport}>
            <DownloadIcon className="mr-2 size-4" />
            Exporter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Colonnes <ChevronDownIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur{" "}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}