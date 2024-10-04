import { Class } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewClass = async (payload: Class) : Promise<{
    data: Class,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/class', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create class');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create class:", error);
        throw error;
      }

    }

    export async function updateClass(payload: Class) : Promise<void> {
        try {
            const response = await fetch(`/api/class/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update class');
                return;
            }
        } catch (error) {
            console.error("Failed to update class:", error);
        }
    }

    export async function deleteClass(id: string) : Promise<void> {
        try {
            await fetch(`/api/class/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Failed to delete class:", error);
        }
    }

    export async function getClass(id: string) : Promise<{data: Class | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/class/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch class' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch class:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllClasses() : Promise<{data: Class[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/class');
            if (!response.ok) {
                throw new Error('Failed to fetch classes');
            }
            const result = await response.json();
            return { 
                data: result.class || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

