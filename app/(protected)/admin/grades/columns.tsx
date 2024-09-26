"use client"

import { Grade } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ActionsCell } from "@/components/action-cell/action-cell"

const actions = (row: Row<Grade>) => [
  { label: "Grade ID", isCopyable:true, copyText: row.original.id, separator:true, onClick: () => {} },
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Edit", isCopyable:false, onClick: () => {} },
  { label: "Delete", isCopyable:false, onClick: () => {} },
]

export const gradesTableColumns: ColumnDef<Grade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Grade ID
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Grade Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "school.name",
    header: "School",
  },
  {
    accessorKey: "students",
    header: "Students",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 100)
      return <Badge>{count}</Badge>
    },
  },
  {
    accessorKey: "applications",
    header: "Applications",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 100)
      return <Badge>{count}</Badge>
    },
  },
  {
    accessorKey: "enrollments",
    header: "Enrollments",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 100)
      return <Badge>{count}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt")
      return <div>{format(date, "MMM d, yyyy")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue<Date>("updatedAt")
      return <div>{format(date, "MMM d, yyyy")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionsCell 
      row={row}
      actions={actions(row)}
      />
    },
  },
]