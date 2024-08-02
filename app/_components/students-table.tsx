"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/types"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { getColumns } from "./students-table-columns"
import { StudentsTableFloatingBar } from "./students-table-floating-bar"
import { useStudentsTable } from "./students-table-provider"
import { StudentsTableToolbarActions } from "./students-table-toolbar-actions"
import { Student } from "@prisma/client"
import { getStudents } from "@/actions/student-action"

interface StudentsTableProps {
  studentsPromise: ReturnType<typeof getStudents>
}

export function StudentsTable({ studentsPromise }: StudentsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useStudentsTable()

  const { data, pageCount } = React.use(studentsPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<Student>[] = [
    {
      label: "First Name",
      value: "firstName",
      placeholder: "Filter by first name...",
    },
    {
      label: "Last Name",
      value: "lastName",
      placeholder: "Filter by last name...",
    },
    {
      label: "Grade",
      value: "grade",
      placeholder: "Filter by grade...",
    },
    {
      label: "School",
      value: "schoolId",
      placeholder: "Filter by school...",
    },
  ]

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: pageCount || 1,
    /* optional props */
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    state: {
      sorting: [{ id: "createdAt", desc: true }],
      pagination: { pageIndex: 0, pageSize: 10 },
      columnPinning: { right: ["actions"] },
    },
    /* */
  })

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <StudentsTableFloatingBar table={table} />
        ) : null
      }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <StudentsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <StudentsTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  )
}