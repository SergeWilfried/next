"use client"

import { DownloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { CreateStudentDialog } from "./create-student-dialog"
import { DeleteStudentsDialog } from "./delete-students-dialog"
import { exportTableToCSV } from "@/lib/export"
import { Student } from "@prisma/client"

interface StudentsTableToolbarActionsProps {
  table: Table<Student>
}

export function StudentsTableToolbarActions({
  table,
}: StudentsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteStudentsDialog
          students={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateStudentDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "tasks",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
