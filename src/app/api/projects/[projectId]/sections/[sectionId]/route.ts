import { NextResponse } from 'next/server';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

const CONTENT_TYPE = {
  MULTIPART: 'multipart/form-data',
  JSON: 'application/json'
} as const;

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; sectionId: string }> }
) {
  try {
    const { projectId, sectionId } = await context.params;
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const transitionName = searchParams.get('transitionName');
    
    console.log('🎯 POST /api/projects/${projectId}/sections/${sectionId}');

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes(CONTENT_TYPE.MULTIPART)) {
      const formData = await req.formData();
      const response = await apiClient(`/projects/${projectId}/sections/${sectionId}`, {
        method: 'POST',
        headers: {
          Cookie: req.headers.get('cookie'),
        },
        data: formData,
      });
      return NextResponse.json(response.data);
    } else {
      const body = await req.json();
      const response = await apiClient(`/projects/${projectId}/sections/${sectionId}`, {
        method: 'POST',
        headers: {
          Cookie: req.headers.get('cookie'),
          'Content-Type': CONTENT_TYPE.JSON,
        },
        params: {
          type,
          transitionName
        },
        data: {
          prompt: body.prompt
        },
      });
      return NextResponse.json(response.data);
    }
  } catch (error) {
    return handleApiError(error);
  }
} 