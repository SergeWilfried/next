"use client"

import { Payment, PaymentStatus, PaymentMethod, Enrollment, EnrollmentStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

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
    header: "Paid Amount",
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
    header: "Enrollment Date",
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt")
      return <div>{format(date, "MMM d, yyyy")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy enrollment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View enrollment details</DropdownMenuItem>
            <DropdownMenuItem>Edit enrollment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]