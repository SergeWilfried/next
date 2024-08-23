"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"

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
parentCommunicationPreferences: z.array(z.enum(["EMAIL", "SMS", "PHONE"])).min(1, "Select at least one communication preference"),
schoolId: z.string().min(1, "School ID is required"),
parentId: z.string().min(1, "Parent ID is required"),
picture: z.instanceof(File).optional().refine(
    (file) => !file || (file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)),
    "File must be a valid image (JPEG, PNG, or GIF) and less than 5MB"
),
class: z.string().min(1, "Class is required"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const classes = [
{ value: "class1", label: "Class 1" },
{ value: "class2", label: "Class 2" },
{ value: "class3", label: "Class 3" },
// Add more classes as needed
];

const communicationPreferences = [
{ id: "EMAIL", label: "Email" },
{ id: "SMS", label: "SMS" },
{ id: "PHONE", label: "Phone" },
]

import { Button } from "@/components/ui/button"
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { PhoneInput } from "@/components/input/phone-input";
import { DialogHeader, DialogFooter, DialogClose, X } from "@/components/ui/dialog";

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
    parentCommunicationPreferences: [],
    schoolId: "",
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
    
    const studentData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        parentId: data.parentId,
        schoolId: data.schoolId,
        gender: data.gender,
        middleName: data.middleName,
        picture: data.picture,
        grade: "12.5",
        class: data.class,
    };

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
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Enroll New Student</DialogTitle>
            <DialogDescription>Enter student details across all tabs before saving.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
                <TabsTrigger value="parent">Parent</TabsTrigger>
                <TabsTrigger value="class">Class</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
                <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Enter the student&apos;s basic details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
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
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="additional">
                <Card>
                <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Enter additional student details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
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
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="parent">
                <Card>
                <CardHeader>
                    <CardTitle>Parent Information</CardTitle>
                    <CardDescription>Enter the parent&apos;s details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="parentFullName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter parent's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="parentPhoneNumber"
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
                    <FormField
                    control={form.control}
                    name="parentCommunicationPreferences"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Communication Preferences</FormLabel>
                            <FormDescription>
                            Select how you&apos;d like to receive communications.
                            </FormDescription>
                        </div>
                        {communicationPreferences.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="parentCommunicationPreferences"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id as "EMAIL" | "SMS" | "PHONE")}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item.id as "EMAIL" | "SMS" | "PHONE"])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="class">
                <Card>
                <CardHeader>
                    <CardTitle>Class Information</CardTitle>
                    <CardDescription>Enter the class and school details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {classes.map((c) => (
                                <SelectItem key={c.value} value={c.value}>
                                {c.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="schoolId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>School ID</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter school ID" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
            <DialogFooter className="mt-4">
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
}