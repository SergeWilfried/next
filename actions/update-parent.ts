import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateParentSchema } from "@/lib/validations/parents";

export async function updateParent(data: UpdateParentSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const existingParent = await prisma.parent.findUnique({
        where: { id: id },
      });
      if (!existingParent) {
        throw new Error(`Parent with id ${id} not found`);
      }

      const response = await prisma.parent.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          address: data.address ? {
            update: data.address
          } : undefined
        },
      })

      return {
        error: null,
        data: response,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
}
