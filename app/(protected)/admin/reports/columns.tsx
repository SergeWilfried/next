"use client"

import { Report } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ActionsCell } from "@/components/action-cell/action-cell"

const actions = (row: Row<Report>) => [
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Delete", isCopyable:false, onClick: () => {} },
  { label: "Download", isCopyable:false, onClick: () => {} },
  { label: "Print", isCopyable:false, onClick: () => {} },
  { label: "Share", isCopyable:false, onClick: () => {} },
]
export const reportsTableColumns: ColumnDef<Report>[] = [
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
    accessorKey: "studentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "desiredGrade",
    header: "Desired Grade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "school.name",
    header: "School",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original
      return <ActionsCell
        row={row}
        actions={actions(row)}
      />
    },
  },
]
