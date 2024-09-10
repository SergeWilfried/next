"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as React from "react"

const parentSchema = z.object({
firstName: z.string().min(1, "First name is required").max(50, "First name must be 50 characters or less"),
middleName: z.string().max(50, "Middle name must be 50 characters or less").optional(),
lastName: z.string().min(1, "Last name is required").max(50, "Last name must be 50 characters or less"),
gender: z.enum(["OTHER", "MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select a valid gender option" })
}),
phoneNumber: z.string().min(1, "Parent's phone number is required"),
gender: z.enum(["OTHER", "MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select a valid gender option" })
}),
parentMaritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"], {
    errorMap: () => ({ message: "Please select a valid marital status" })
}),
maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"], {
    errorMap: () => ({ message: "Please select a valid marital status" })
}),
parentId: z.string().min(1, "Parent ID is required"),
parentCommunicationPreferences: z.array(z.enum(["EMAIL", "SMS", "PHONE"])).min(1, "Select at least one communication preference"),
});

type ParentFormValues = z.infer<typeof parentSchema>;



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { PhoneInput } from "@/components/input/phone-input";

export function NewParentDialog() {
const [open, setOpen] = useState(false)
const form = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "OTHER",
    phoneNumber: "",
    maritalStatus: "SINGLE",
    parentCommunicationPreferences: [],
    },
})

const onSubmit = async (data: ParentFormValues) => {
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
        <Button>Add Parent</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Parent</DialogTitle>
          <DialogDescription>Enter parent details to add a new parent.</DialogDescription>
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
           
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SINGLE">Single</SelectItem>
                        <SelectItem value="MARRIED">Married</SelectItem>
                        <SelectItem value="DIVORCED">Divorced</SelectItem>
                        <SelectItem value="WIDOWED">Widowed</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput placeholder="Enter phone number" {...field} />
                      </FormControl>
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