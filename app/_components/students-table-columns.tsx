"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/handle-error"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { DeleteStudentsDialog } from "./delete-students-dialog"
import { UpdateStudentSheet } from "./update-student-sheet"
import { Student } from "@prisma/client"
import { updateStudent } from "@/actions/student-action"

export function getColumns(): ColumnDef<Student>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
      accessorKey: "grade",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Grade" />
      ),
      cell: ({ row }) => <div>{row.getValue("grade")}</div>,
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
      cell: ({ row }) => formatDate(row.getValue("dateOfBirth")),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateStudentSheet, setShowUpdateStudentSheet] =
          React.useState(false)
        const [showDeleteStudentDialog, setShowDeleteStudentDialog] =
          React.useState(false)

        return (
          <>
            <UpdateStudentSheet
              open={showUpdateStudentSheet}
              onOpenChange={setShowUpdateStudentSheet}
              student={row.original}
            />
            <DeleteStudentsDialog
              open={showDeleteStudentDialog}
              onOpenChange={setShowDeleteStudentDialog}
              students={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateStudentSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteStudentDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
      size: 40,
    },
  ]
}