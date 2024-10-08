import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateAddressSchema } from "@/lib/validations/address";

export async function updateClass(data: UpdateAddressSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const existingAddress = await prisma.address.findUnique({
        where: { id: id },
      });
      if (!existingAddress) {
        throw new Error(`Address with id ${id} not found`);
      }

      const response = await prisma.address.update({
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
