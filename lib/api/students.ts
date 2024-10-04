import { Student } from "@prisma/client";

export async function getAllStudents({
  page,
  schoolId,
  userId,
  limit,
  search,
  sort,
  sortBy,
}: {
  page: number;
  limit: number;
  schoolId: string;
  userId: string;
  search: string;
  sort: "asc" | "desc";
  sortBy: string;
}): Promise<{ data: Student[] | null, count: number, error: Error | null }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        schoolId,
        userId,
        search,
        sort,
        sortBy
      });
      const response = await fetch(`${baseUrl}/api/students?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching students:', error);
    return { data: null, count: 0, error: error };
  }
}