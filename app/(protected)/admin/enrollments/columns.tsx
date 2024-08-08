"use client"

import { Payment, PaymentStatus, PaymentMethod, Enrollment, EnrollmentStatus } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ActionsCell } from "@/components/action-cell/action-cell"

const actions = (row: Row<Enrollment>) => [
  { label: "Enrollment ID", isCopyable:true, copyText: row.original.id, separator:true, onClick: () => {} },
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Edit", isCopyable:false, onClick: () => {} },
  { label: "Delete", isCopyable:false, onClick: () => {} },
]

export const enrollmentsTableColumns: ColumnDef<Enrollment>[] = [
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
        Enrollment ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "student.name",
    header: "Student Name",
  },
  {
    accessorKey: "academicYear",
    header: "Academic Year",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue<EnrollmentStatus>("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "totalFee",
    header: "Total Fee",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalFee"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "XOF",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Paid",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("paidAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "XOF",
      }).format(amount)
      return <div>{formatted}</div>
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
