"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as React from "react"

const studentSchema = z.object({
firstName: z.string().min(1, "First name is required").max(50, "First name must be 50 characters or less"),
middleName: z.string().max(50, "Middle name must be 50 characters or less").optional(),
lastName: z.string().min(1, "Last name is required").max(50, "Last name must be 50 characters or less"),
dateOfBirth: z.date({
    required_error: "Date of birth is required.",
}),
gender: z.enum(["OTHER", "MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select a valid gender option" })
}),
parentFullName: z.string().min(1, "Parent's full name is required"),
parentPhoneNumber: z.string().min(1, "Parent's phone number is required"),
parentGender: z.enum(["OTHER", "MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select a valid gender option" })
}),
parentMaritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"], {
    errorMap: () => ({ message: "Please select a valid marital status" })
}),
parentId: z.string().min(1, "Parent ID is required"),
parentCommunicationPreferences: z.array(z.enum(["EMAIL", "SMS", "PHONE"])).min(1, "Select at least one communication preference"),
picture: z.instanceof(File).optional().refine(
    (file) => !file || (file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)),
    "File must be a valid image (JPEG, PNG, or GIF) and less than 5MB"
),
class: z.string().min(1, "Class is required"),
});

type StudentFormValues = z.infer<typeof studentSchema>;



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function NewStudentDialog() {
const [open, setOpen] = useState(false)
const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "OTHER",
    parentFullName: "",
    parentPhoneNumber: "",
    parentGender: "OTHER",
    parentMaritalStatus: "SINGLE",
    parentCommunicationPreferences: [],
    class: "",
    },
})

const onSubmit = async (data: StudentFormValues) => {
    try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
        formData.append(key, value);
        } else if (value !== undefined) {
        formData.append(key, value.toString());
        }
    });
    

    setOpen(false);
    form.reset();
    // You might want to add a toast notification here
    } catch (error) {
    console.error("Failed to create student:", error);
    // You might want to add an error toast notification here
    }
}

return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Enroll New Student</DialogTitle>
          <DialogDescription>Enter student details to enroll a new student.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OTHER">Other</SelectItem>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save Student</Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}