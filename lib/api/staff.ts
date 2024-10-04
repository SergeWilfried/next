import { Staff } from "@prisma/client";


export const addNewStaff = async (staff: Staff) : Promise<{
    data: Staff,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/staff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staff),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create staff');
        }
        const result = await response.json();
        return { data: result, error: null };
      } catch (error) {
        console.error("Failed to create staff:", error);
        throw error;
      }

    }

    export async function updateStaff(staff: Staff) : Promise<void> {
        try {
            const response = await fetch(`/api/staff/${staff.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staff),
            });

            if (!response.ok) {
                console.error('Failed to update staff');
                return;
            }
        } catch (error) {
            console.error("Failed to update staff:", error);
        }
    }

    export async function deleteStaff(id: string) : Promise<void> {
        try {
            const response = await fetch(`/api/staff/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete staff');
            }
        } catch (error) {
            console.error("Failed to delete staff:", error);
        }
    }

    export async function getStaff(id: string) : Promise<{data: Staff | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/staff/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch staff' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch staff:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllStaff() : Promise<{data: Staff[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/staff');
            if (!response.ok) {
                throw new Error('Failed to fetch staffs');
            }
            const result = await response.json();
            return { 
                data: result.staffs || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

