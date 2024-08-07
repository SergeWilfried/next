"use client"

import { Student } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const studentsTableColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
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
  },
]
