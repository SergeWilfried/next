"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { setCookie } from 'cookies-next';

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "next-auth";
import { School } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchoolCategory, SchoolType } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { createSchool } from "@/lib/api/schools";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const randomColor = ['red', 'blue', 'green', 'yellow', 'purple'][Math.floor(Math.random() * 5)];

const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  phoneNumber: z.string().min(1, "Phone number is required"),
  category: z.nativeEnum(SchoolCategory),
  type: z.nativeEnum(SchoolType),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export default function ProjectSwitcher({
  large = false,
  schools,
}: {
  large?: boolean;
  schools: School[];
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(schools[0] || null);
  const user = session?.user as User;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      category: SchoolCategory.PRIVATE,
      type: SchoolType.HIGH_SCHOOL,
    },
  });

  if (!schools || status === "loading") {
    return <ProjectSwitcherPlaceholder />;
  }

  const handleCreateSchool = async (data: SchoolFormData) => {
    const response = await createSchool({ userId: user.id || '', ...data });
    setIsDialogOpen(false);
    reset();
  };

  const handleSchoolChange = (school: School) => {
    setSelectedSchool(school);
    setOpenPopover(false);
    setCookie('selectedSchoolId', school.id);
    router.refresh();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <Button
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  `bg-${randomColor}-500`,
                )}
              />
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                    large ? "w-full" : "max-w-[80px]",
                  )}
                >
                  {selectedSchool?.name || "Select a school"}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selectedSchool || schools[0]}
            projects={schools}
            setOpenPopover={setOpenPopover}
            setIsDialogOpen={setIsDialogOpen}
            onSchoolChange={handleSchoolChange}
          />
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New School</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateSchool)} className="space-y-4">
          <div>
            <Label htmlFor="name">School Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter school name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Enter school address"
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select {...register("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SchoolCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select {...register("type")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SchoolType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>
          <Button type="submit">Create School</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProjectList({
  selected,
  projects,
  setOpenPopover,
  setIsDialogOpen,
  onSchoolChange,
}: {
  selected: School;
  projects: School[];
  setOpenPopover: (open: boolean) => void;
  setIsDialogOpen: (open: boolean) => void;
  onSchoolChange: (school: School) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {projects.map((school) => (
        <Link
          key={school.id}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
          )}
          href="#"
          onClick={() => {
            onSchoolChange(school);
            setOpenPopover(false);
          }}        >
          <div className={cn("size-3 shrink-0 rounded-full", `bg-${randomColor}-500`)} />
          <span
            className={`flex-1 truncate text-sm ${
              selected.id === school.id
                ? "font-medium text-foreground"
                : "font-normal"
            }`}
          >
            {school.name}
          </span>
          {selected.id === school.id && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
              <Check size={18} aria-hidden="true" />
            </span>
          )}
        </Link>
      ))}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative flex h-9 items-center justify-center gap-2 p-2"
          onClick={() => {
            setOpenPopover(false);
            setIsDialogOpen(true);
          }}
        >
          <Plus size={18} className="absolute left-2.5 top-2" />
          <span className="flex-1 truncate text-center">New School</span>
        </Button>
      </DialogTrigger>
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
