"use client"

import * as React from "react"
import { Student } from "@prisma/client"

import { updateStudentSchema, type UpdateStudentSchema } from "@/lib/validations/student"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { updateStudent } from "@/actions/student-action"

interface UpdateStudentSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  student: Student
}

export function UpdateStudentSheet({ student, ...props }: UpdateStudentSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()

  const form = useForm<UpdateStudentSchema>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      parentId: student.parentId,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName ?? undefined,
      dateOfBirth: student.dateOfBirth,
      grade: student.grade,
      allergies: student.allergies ?? undefined,
      medicalNotes: student.medicalNotes ?? undefined,
      schoolId: student.schoolId,
    },
  })

  React.useEffect(() => {
    form.reset({
      parentId: student.parentId,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName ?? undefined,
      dateOfBirth: student.dateOfBirth,
      grade: student.grade,
      allergies: student.allergies ?? undefined,
      medicalNotes: student.medicalNotes ?? undefined,
      schoolId: student.schoolId,
    })
  }, [student, form])

  function onSubmit(input: UpdateStudentSchema) {
    startUpdateTransition(async () => {
      const { error } = await updateStudent(input)

      if (error) {
        toast.error(error)
        return
      }

      form.reset()
      props.onOpenChange?.(false)
      toast.success("Student updated")
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Student</SheetTitle>
          <SheetDescription>
            Update the student details and save the changes
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value?.toISOString().split('T')[0]} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}