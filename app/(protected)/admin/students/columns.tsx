"use client"

import { Student } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { ActionsCell } from "@/components/action-cell/action-cell"
import { format } from "date-fns" // Added this import
import { Badge } from "@/components/ui/badge"

const actions = (row: Row<Student>) => [
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Student Id", isCopyable:true, onClick: () => {}, separator:true },
  { label: "Edit", isCopyable:false, onClick: () => {} },
  { label: "Delete", isCopyable:false, onClick: () => {} },
]

export const studentsTableColumns: ColumnDef<Student>[] = [
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
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const dateOfBirth = row.getValue("dateOfBirth")
      // Format the date if it exists
      const formatted = dateOfBirth
        ? format(new Date(dateOfBirth as string), "MMM d, yyyy")
        : ""
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">{row.getValue("status")}</Badge>
    ),
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
