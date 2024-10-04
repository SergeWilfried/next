import { Report } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';


export const addNewReport = async (payload: Report) : Promise<{
    data: Report,
    error: string | null
}> => {
    try {
        const response = await fetch('/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create report');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Failed to create report:", error);
        throw error;
      }

    }

    export async function updateReport(payload: Report) : Promise<void> {
        try {
            const response = await fetch(`/api/report/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error('Failed to update report');
                return;
            }
        } catch (error) {
            console.error("Failed to update report:", error);
        }
    }

    export async function deleteReport(id: string) : Promise<void> {
        try {
            const response = await fetch(`/api/report/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete report');
            }
        } catch (error) {
            console.error("Failed to delete report:", error);
        }
    }

    export async function getReport(id: string) : Promise<{data: Report | null, error: string | null}> { 
        try {
            const response = await fetch(`/api/report/${id}`);
            if (!response.ok) {
                return { data: null, error: 'Failed to fetch report' };
            }
            const result = await response.json();
            return { data: result, error: null };
        } catch (error) {
            console.error("Failed to fetch report:", error);
            return { data: null, error: error.message };
        }
    }

    export async function getAllReports() : Promise<{data: Report[], count: number, error: string | null}> {
        try {
            const response = await fetch('/api/report');
            if (!response.ok) {
                throw new Error('Failed to fetch reports');
            }
            const result = await response.json();
            return { 
                data: result.report || [], 
                count: result.count || 0, 
                error: null 
            };
        } catch (error) {
            console.error("Failed to fetch staffs:", error);
            return { data: [], count: 0, error: error.message };
        }
    }

