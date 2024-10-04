import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateStaffSchema } from "@/lib/validations/staff";

export async function updateParent(data: UpdateStaffSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const response = await prisma.staff.update({
        where: {
          id: id,
        },
        data: data,
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
