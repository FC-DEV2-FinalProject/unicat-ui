import { NextResponse } from 'next/server';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

type SectionType = 'image' | 'script' | null;

const CONTENT_TYPE = {
  MULTIPART: 'multipart/form-data',
  JSON: 'application/json'
} as const;

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    console.log('🎯 POST /api/projects/${projectId}/sections');

    const contentType = req.headers.get('content-type') || '';
    const body = contentType.includes(CONTENT_TYPE.MULTIPART) 
      ? await req.formData()
      : await req.json();

    const { sectionId, type, ...rest } = body;

    const response = await apiClient(`/projects/${projectId}/sections/${sectionId}`, {
      method: 'POST',
      headers: {
        Cookie: req.headers.get('cookie'),
        'Content-Type': contentType,
      },
      data: contentType.includes(CONTENT_TYPE.MULTIPART)
        ? body
        : { type: type as SectionType, ...rest },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
} 