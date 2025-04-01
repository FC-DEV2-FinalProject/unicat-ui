import { NextResponse } from 'next/server';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';
import { VOICE_TYPES } from '@/src/types/voiceTypes';
import { TRANSITION_TYPES } from '@/src/types/transitionTypes';

const CONTENT_TYPE = {
  MULTIPART: 'multipart/form-data',
  JSON: 'application/json'
} as const;

interface JsonRequestBody {
  imageUrl?: string;
  alt?: string;
  script?: string;
  voiceModel?: string;
  transitionName?: string;
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; sectionId: string }> }
) {
  try {
    const { projectId, sectionId } = await context.params;
    console.log('🎯 Next.js API 라우터 - PATCH /projects/${projectId}/sections/${sectionId}');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);

    if (contentType.includes(CONTENT_TYPE.MULTIPART)) {
      console.log('라우트 로그 : 📤 FormData 요청 처리');
      const formData = await req.formData();
      
      // voiceModel과 transitionName이 없으면 기본값 설정
      if (!formData.has('voiceModel')) {
        formData.append('voiceModel', VOICE_TYPES[0].name);
      }
      if (!formData.has('transitionName')) {
        formData.append('transitionName', TRANSITION_TYPES[0].name);
      }

      await apiClient.patch(
        `/projects/${projectId}/sections/${sectionId}`,
        formData,
        {
          headers: {
            Cookie: req.headers.get('cookie'),
          },
        }
      );
      return new NextResponse(null, { status: 204 });
    } 
    else if (contentType.includes(CONTENT_TYPE.JSON)) {
      console.log('라우트 로그 : 📤 JSON 요청 처리');
      const body = await req.json() as JsonRequestBody;
      
      await apiClient.patch(
        `/projects/${projectId}/sections/${sectionId}`,
        {
          imageUrl: body.imageUrl,
          alt: body.alt,
          script: body.script,
          voiceModel: body.voiceModel || VOICE_TYPES[0].name,
          transitionName: body.transitionName || TRANSITION_TYPES[0].name
        },
        {
          headers: {
            Cookie: req.headers.get('cookie'),
            'Content-Type': CONTENT_TYPE.JSON,
          },
        }
      );
      return new NextResponse(null, { status: 204 });
    } else {
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