import { Enrollment } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewenrollment = async (payload: Enrollment) : Promise<{
    data: Enrollment,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create application');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create application:", error);
        throw error;
      }

    }

    export async function updateenrollment(payload: Enrollment) : Promise<void> {
        try {
            const response = await fetch(`/api/application/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update application');
                return;
            }
        } catch (error) {
            console.error("Failed to update application:", error);
        }
    }

    export async function deleteenrollment(id: string) : Promise<void> {
        try {
            await fetch(`/api/application/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Failed to delete application:", error);
        }
    }

    export async function getenrollment(id: string) : Promise<{data: Enrollment | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/application/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch application' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch application:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllEnrollments() : Promise<{data: Enrollment[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/application');
            if (!response.ok) {
                throw new Error('Failed to fetch applicationes');
            }
            const result = await response.json();
            return { 
                data: result.applications || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

