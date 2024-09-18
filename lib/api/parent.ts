import { Parent } from "@prisma/client";


export const addNewParent = async (parent) : Promise<{
    data: Parent,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/parents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parent),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create parent');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create parent:", error);
        throw error;
      }

    }

    export async function updateParent(parent: Parent) : Promise<void> {
        try {
            const response = await fetch(`/api/parents/${parent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parent),
            });

            if (!response.ok) {
                console.error('Failed to update parent');
                return;
            }
        } catch (error) {
            console.error("Failed to update parent:", error);
        }
    }

    export async function deleteParent(id: string) : Promise<void> {
        try {
            await fetch(`/api/parents/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Failed to delete parent:", error);
        }
    }

    export async function getParent(id: string) : Promise<{data: Parent | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/parents/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch parent' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch parent:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getParents() : Promise<{data: Parent[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/parents');
            if (!response.ok) {
                throw new Error('Failed to fetch parents');
            }
            const result = await response.json();
            return { 
                data: result.parents || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch parents:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

