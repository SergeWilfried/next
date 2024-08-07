
import { auth } from "@/auth";
import { prisma } from "@/lib/db";


export async function getAllParents() {
    try {
      const parents = await prisma.parent.findMany();
      return {
        error: null,
        data: parents ?? [],
        count: parents.length ?? 0,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
  }