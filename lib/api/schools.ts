import { School } from "@prisma/client";

export async function createSchool(schoolData: {
  userId: string;
  [key: string]: any;
}): Promise<{ data: School | null; error: Error | null }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}/api/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schoolData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating school:', error);
    return { data: null, error: error as Error };
  }
}

export async function getSchools({
  userId
}: {
  userId: string;
}): Promise<{ data: School[] | null; count: number; error: Error | null }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const queryParams = new URLSearchParams({ userId });
    const response = await fetch(`${baseUrl}/api/schools?${queryParams}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching schools:', error);
    return { data: null, count: 0, error: error as Error };
  }
}