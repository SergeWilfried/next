"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createStudent } from "@/actions/student-action";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be 50 characters or less"),
  middleName: z.string().max(50, "Middle name must be 50 characters or less").optional(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be 50 characters or less"),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
  }, {
    message: "Invalid date. Please enter a valid date not in the future.",
  }),
  gender: z.enum(["OTHER", "MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select a valid gender option" })
  }),
  parentId: z.string().min(1, "Parent ID is required"),
  schoolId: z.string().min(1, "School ID is required"),
  picture: z.instanceof(File).optional().refine(
    (file) => !file || (file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)),
    "File must be a valid image (JPEG, PNG, or GIF) and less than 5MB"
  ),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export function NewStudentDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "OTHER",
      parentId: "",
      schoolId: "",
    },
  });

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
      
      const studentData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        parentId: data.parentId,
        schoolId: data.schoolId,
        gender: data.gender,
        middleName: data.middleName,
        picture: data.picture,
        grade: "12.5"
      };


      await createStudent(studentData);
      setOpen(false);
      form.reset();
      router.refresh(); // Refresh the page to show the new student
      // You might want to add a toast notification here
    } catch (error) {
      console.error("Failed to create student:", error);
      // You might want to add an error toast notification here
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details of the new student here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (Optional)</FormLabel>
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
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
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
            <FormField
              control={form.control}
              name="picture"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Picture (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Student</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}