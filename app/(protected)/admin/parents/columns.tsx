"use client"

import { Parent } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

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
      const parent = row.original
      const { toast } = useToast()

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
               onClick={() => {
                navigator.clipboard.writeText(parent.id)
                toast({
                  title: "Parent ID copied",
                  description: "Parent ID copied to clipboard",
                })
              }}
            >
              Copy student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View student details</DropdownMenuItem>
            <DropdownMenuItem>Edit student</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
