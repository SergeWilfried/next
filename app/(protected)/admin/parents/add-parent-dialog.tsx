"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { PhoneInput } from "@/components/input/phone-input";
import { addNewParent } from "@/lib/api";
import { ParentFormValues, parentSchema } from "@/lib/validations/parents";

export function NewParentDialog() {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<ParentFormValues>({
		resolver: zodResolver(parentSchema),
		defaultValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			gender: "OTHER",
			phoneNumber: "",
			maritalStatus: "SINGLE",
			communicationPreference: [],
		},
	});

	const onSubmit = async (data: ParentFormValues) => {
		setIsSubmitting(true);
		try {
			const result = await addNewParent(data);
			
			if (result.error) {
				throw new Error(result.error);
			}

			setOpen(false);
			form.reset();
			toast({
				title: "Success",
				description: "Parent added successfully",
				variant: "default",
			});
		} catch (error) {
			console.error("Failed to create parent:", error);
			toast({
				title: "Error",
				description: "Failed to add parent. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
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
							<Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Saving..." : "Save"}
							</Button>
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