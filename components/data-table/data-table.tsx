"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  pageCount: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount
}: DataTableProps<TData, TValue>) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // search params
  const page = searchParams?.get("page") ?? "1" // default is page: 1
  const per_page = searchParams?.get("per_page") ?? "5" // default 5 record per page

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

  const formattedColumns = React.useMemo(() => {
    return columns.map(column => ({
      ...column,
      cell: (info: any) => {
        const value = info.getValue();
        if (column.id === 'status') {
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
              {value}
            </span>
          );
        }
        if (value instanceof Date) {
          return value.toLocaleDateString();
        }
        return flexRender(column.cell, info);
      }
    }));
  }, [columns]);

  const table = useReactTable({
    data,
    columns: formattedColumns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pageCount ?? -1,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  })
  return (
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={() => table.previousPage()} 
              isActive={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {table.getPageOptions().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                href="#" 
                onClick={() => table.setPageIndex(page)}
                isActive={page === table.getState().pagination.pageIndex}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pageCount > table.getPageCount() && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={() => table.nextPage()} 
              isActive={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-red-100 text-red-800';
    case 'GRADUATED':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}