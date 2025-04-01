
//todo 추후 api 클라이언트로 재 변경
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

    return response.json();
  } catch (error) {
    console.error('Error updating section:', error);
    throw error;
  }
};

export const createProject = async (projectId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/projects/${projectId}?type=artifact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    if (response.status !== 202) {
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const createProjectArtifact = async (projectId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/projects/${projectId}?type=artifact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create project artifact');
    }

    if (response.status !== 202) {
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    console.error('Error creating project artifact:', error);
    throw error;
  }
}; 