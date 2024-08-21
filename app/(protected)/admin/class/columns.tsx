"use client"

import { Class } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { ActionsCell } from "@/components/action-cell/action-cell"

const actions = (row: Row<Class>) => [
  { label: "View", isCopyable:false, onClick: () => {} },
  { label: "Edit", isCopyable:false, onClick: () => {} },
]



export const classTableColumns: ColumnDef<Class>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Class Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "school.name",
    header: "School Name",
  },
  {
    accessorKey: "schoolId",
    header: "School ID",
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
    accessorKey: "students",
    header: "Students",
    cell: ({ row }) => {
      const students = row.getValue<Student[]>("students")
      return <div>{students?.length || 0}</div>
    },
  },
  {
    accessorKey: "teachers",
    header: "Teachers",
    cell: ({ row }) => {
      const teachers = row.getValue<Staff[]>("teachers")
      return <div>{teachers?.length || 0}</div>
    },
  },
  {
    accessorKey: "course",
    header: "Courses",
    cell: ({ row }) => {
      const courses = row.getValue<Course[]>("course")
      return <div>{courses?.length || 0}</div>
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