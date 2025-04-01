import apiClient from '@/src/utils/apiClient';


// interface CreateSectionResponse {
//   id: number;
// }

// export const createSection = async (projectId: string): Promise<CreateSectionResponse> => {
//   try {
//     const response = await apiClient.post<CreateSectionResponse>(
//       `/api/projects/${projectId}/sections`
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed to create section:', error);
//     throw error;
//   }
// };

interface UpdateSectionBody {
  voiceModel?: string;
  alt?: string;
  script?: string;
  transitionName?: string;
  prompt?: string;
}

interface UpdateSectionResponse {
  id: number;
  script?: string;
  sortOrder?: number;
  contentUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  alt?: string;
  voiceModel?: string;
  transitionUrl?: string;
  imageUrl?: string;
}

export const updateSection = async (
  projectId: string, 
  body: UpdateSectionBody | FormData
): Promise<UpdateSectionResponse> => {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`/api/projects/${projectId}/sections`, {
      method: 'POST',
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update section');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating section:', error);
    throw error;
  }
}; 