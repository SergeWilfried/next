import { Attendance } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewAttendance = async (payload: Attendance) : Promise<{
    data: Attendance,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'attendance/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create attendance');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create attendance:", error);
        throw error;
      }

    }

    export async function updateAttendance(payload: Attendance) : Promise<void> {
        try {
            const response = await fetch(`/api/attendance/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'attendance/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update attendance');
                return;
            }
        } catch (error) {
            console.error("Failed to update attendance:", error);
        }
    }

    export async function deleteAttendance(id: string) : Promise<void> {
        try {
            const response = await fetch(`/api/attendance/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete attendance');
            }
        } catch (error) {
            console.error("Failed to delete attendance:", error);
        }
    }

    export async function getAttendance(id: string) : Promise<{data: Attendance | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/attendance/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch attendance' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllAttendances() : Promise<{data: Attendance[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/attendance');
            if (!response.ok) {
                throw new Error('Failed to fetch attendances');
            }
            const result = await response.json();
            return { 
                data: result.attendances || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

