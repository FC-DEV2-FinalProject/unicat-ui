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
    console.log('🎯 Next.js API 라우터 - POST /projects/${projectId}/sections/${sectionId}');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);

    // FormData 요청 처리 (직접 업로드)
    if (contentType.includes(CONTENT_TYPE.MULTIPART)) {
      console.log('라우트 로그 : 📤 FormData 요청 처리');
      const formData = await req.formData();
      const response = await apiClient.post(`/projects/${projectId}/sections/${sectionId}`, formData, {
        headers: {
          Cookie: req.headers.get('cookie'),
        },
      });
      return NextResponse.json(response.data);
    } 
    // JSON 요청 처리 (AI 생성)
    else if (contentType.includes(CONTENT_TYPE.JSON)) {
      console.log('라우트 로그 : 📤 JSON 요청 처리 (AI 생성)');
      const body = await req.json();
      const response = await apiClient.post(
        `/projects/${projectId}/sections/${sectionId}`,
        { prompt: body.prompt },
        {
          headers: {
            Cookie: req.headers.get('cookie'),
            'Content-Type': CONTENT_TYPE.JSON,
          },
        }
      );
      return NextResponse.json(response.data);
    }
    // 지원하지 않는 Content-Type
    else {
      console.error('❌ 지원하지 않는 Content-Type:', contentType);
      return NextResponse.json(
        { error: '지원하지 않는 Content-Type입니다.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('❌ API 에러:', error);
    return handleApiError(error);
  }
} 