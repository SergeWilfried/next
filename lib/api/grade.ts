import { Grade } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewGrade = async (payload: Grade) : Promise<{
    data: Grade,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/grade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create grade');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create grade:", error);
        throw error;
      }

    }

    export async function updateGrade(payload: Grade) : Promise<void> {
        try {
            const response = await fetch(`/api/grade/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update grade');
                return;
            }
        } catch (error) {
            console.error("Failed to update grade:", error);
        }
    }

    export async function deleteGrade(id: string) : Promise<void> {
        try {
            const response = await fetch(`/api/grade/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete grade');
            }
        } catch (error) {
            console.error("Failed to delete grade:", error);
        }
    }

    export async function getGrade(id: string) : Promise<{data: Grade | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/grade/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch grade' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch grade:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllGrades() : Promise<{data: Grade[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/grade');
            if (!response.ok) {
                throw new Error('Failed to fetch gradees');
            }
            const result = await response.json();
            return { 
                data: result.grade || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

