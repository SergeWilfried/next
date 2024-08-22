"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const classSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  description: z.string().optional(),
});

type ClassFormData = z.infer<typeof classSchema>;

export default function AddClassDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
  });

  const onSubmit = async (data: ClassFormData) => {
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data.className, description: data.description }),
      });
      if (!response.ok) {
        throw new Error('Failed to create class');
      }
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Class</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Enter the details for the new class here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                {...register("className")}
                className={errors.className ? "border-red-500" : ""}
              />
              {errors.className && (
                <p className="text-red-500 text-sm">{errors.className.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}