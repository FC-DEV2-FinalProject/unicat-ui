import apiClient from '@/src/utils/apiClient';

interface CreateSectionResponse {
  id: number;
}

export const createSection = async (projectId: string): Promise<CreateSectionResponse> => {
  try {
    const response = await apiClient.post<CreateSectionResponse>(
      `/api/projects/${projectId}/sections`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create section:', error);
    throw error;
  }
};

export const updateSection = async (
  projectId: string,
  sectionId: string,
  data: { prompt: string } | FormData
) => {
  try {
    const response = await apiClient.post(
      `/api/projects/${projectId}/sections/${sectionId}`,
      data,
      {
        headers: data instanceof FormData ? {
          'Content-Type': 'multipart/form-data',
        } : {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update section:', error);
    throw error;
  }
}; 