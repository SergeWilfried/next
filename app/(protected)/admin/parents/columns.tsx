"use client"

import { Parent } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ActionsCell } from "@/components/action-cell/action-cell"

const actions = (row: Row<Parent>) => [
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Edit", isCopyable:false, onClick: () => {} },
  { label: "Delete", isCopyable:false, onClick: () => {} },
]
export const parentsTableColumns: ColumnDef<Parent>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "communicationPreference",
    header: "Communication Preference",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("communicationPreference")}
      </Badge>
    ),
  },
  {
    accessorKey: "studentCount",
    header: "Students",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 10)
      return <div>{count}</div>
    },
  },
  {
    accessorKey: "applicationsCount",
    header: "Applications",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 5)
      return <div>{count}</div>
    },
  },
  {
    accessorKey: "contactsCount",
    header: "Contacts",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 5)
      return <div>{count}</div>
    },
  },
  {
    accessorKey: "donationsCount",
    header: "Donations",
    cell: ({ row }) => {
      const count = Math.floor(Math.random() * 25)
      return <div>{count}</div>
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
