import { Donation } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewDonation = async (payload: Donation) : Promise<{
    data: Donation,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/donation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create donation');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create donation:", error);
        throw error;
      }

    }

    export async function updateDonation(payload: Donation) : Promise<void> {
        try {
            const response = await fetch(`/api/donation/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update donation');
                return;
            }
        } catch (error) {
            console.error("Failed to update donation:", error);
        }
    }

    export async function deleteDonation(id: string) : Promise<void> {
        try {
            await fetch(`/api/donation/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Failed to delete donation:", error);
        }
    }

    export async function getDonation(id: string) : Promise<{data: Donation | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/donation/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch donation' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch donation:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllDonations() : Promise<{data: Donation[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/donation');
            if (!response.ok) {
                throw new Error('Failed to fetch donationes');
            }
            const result = await response.json();
            return { 
                data: result.donation || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

