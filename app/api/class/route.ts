import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { classSchema } from "@/lib/validations/class";
import { z } from "zod";
import { UserRole } from "@prisma/client"; // Assuming you have a UserRole enum

// Create (POST)
export const POST = auth(async (req) => {
  if (!req.auth?.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = classSchema.parse(body);
    const newClass = await prisma.class.create({
      data: {
        name: validatedData.name,
        schoolId: validatedData.schoolId,
        description: validatedData.description,
        students: {
          connect: validatedData.students?.map(id => ({ id }))
        },
        enrollments: {
          connect: validatedData.enrollments?.map(id => ({ id }))
        },
        applications: {
          connect: validatedData.applications?.map(id => ({ id }))
        },
        teachers: {
          connect: validatedData.teachers?.map(id => ({ id }))
        },
        courses: {
          connect: validatedData.courses?.map(id => ({ id }))
        },
        grades: {
          connect: validatedData.grades?.map(id => ({ id }))
        },
      },
    });
    return new Response(JSON.stringify(newClass), { status: 201 });
  } catch (error) {
    console.error("Error creating class:", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 400 });
    }
    return new Response("Internal server error", { status: 500 });
  }
});

// Read (GET)
export const GET = auth(async (req) => {
  if (!req.auth?.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    const classes = await prisma.class.findMany();
    return new Response(JSON.stringify(classes), { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return new Response("Internal server error", { status: 500 });
  }
});

// Update (PUT)
export const PUT = auth(async (req) => {
  if (!req.auth?.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updateData } = classSchema.extend({ id: z.string() }).parse(body);
    const existingClass = await prisma.class.findUnique({
      where: { id },
    });
    if (!existingClass) {
      throw new Error(`Class with id ${id} not found`);
    }
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        name: updateData.name,
        schoolId: updateData.schoolId,
        description: updateData.description,
        students: updateData.students ? {
          connect: updateData.students.map(id => ({ id }))
        } : undefined,
        enrollments: updateData.enrollments ? {
          connect: updateData.enrollments.map(id => ({ id }))
        } : undefined,
        applications: updateData.applications ? {
          connect: updateData.applications.map(id => ({ id }))
        } : undefined,
        teachers: updateData.teachers ? {
          connect: updateData.teachers.map(id => ({ id }))
        } : undefined,
        courses: updateData.courses ? {
          connect: updateData.courses.map(id => ({ id }))
        } : undefined,
        grades: updateData.grades ? {
          connect: updateData.grades.map(id => ({ id }))
        } : undefined,
      },
    });
    return new Response(JSON.stringify(updatedClass), { status: 200 });
  } catch (error) {
    console.error("Error updating class:", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 400 });
    }
    return new Response("Internal server error", { status: 500 });
  }
});

// Delete (DELETE) - Admin only
export const DELETE = auth(async (req) => {
  if (!req.auth?.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  if (req.auth.user.role !== UserRole.ADMIN) {
    return new Response("Forbidden: Admin access required", { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return new Response("Missing class ID", { status: 400 });
    }

    await prisma.class.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting class:", error);
    return new Response("Internal server error", { status: 500 });
  }
});


