

export async function getAllStaff() {
  try {
    const staff = await prisma.staff.findMany();
    return {
      error: null,
      data: staff ?? [],
      count: staff.length ?? 0,
    }
  } catch (error) {
    console.error(error);
    return {
      error: error,
      data: [],
      count: 0,
    }
  }
}