import { NextResponse } from 'next/server';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; sectionId: string }> }
) {
  try {
    const { projectId, sectionId } = await context.params;
    console.log('🎯 Next.js API 라우터 - POST /projects/${projectId}/sections/${sectionId}/ai');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const body = await req.json();
    const response = await apiClient.post(
      `/projects/${projectId}/sections/${sectionId}/ai`,
      { prompt: body.prompt },
      {
        headers: {
          Cookie: req.headers.get('cookie'),
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ API 에러:', error);
    return handleApiError(error);
  }
}
