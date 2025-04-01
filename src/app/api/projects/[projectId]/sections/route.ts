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

interface SectionResponse {
  id: number;
  script?: string;
  sortOrder?: number;
  contentUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  alt?: string;
  voiceModel?: string;
  transitionUrl?: string;
}

interface JsonRequestBody {
  voiceModel?: string;
  alt?: string;
  script?: string;
  transitionName?: string;
  prompt?: string;
  imageUrl?: string;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    console.log('🎯 Next.js API 라우터 - POST /projects/${projectId}/sections');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);

    // FormData 요청 처리 (직접 업로드)
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

      const response = await apiClient.post<SectionResponse>(`/projects/${projectId}/sections`, formData, {
        headers: {
          Cookie: req.headers.get('cookie'),
        },
      });
      return NextResponse.json(response.data);
    } 
    // JSON 요청 처리 (AI 생성)
    else if (contentType.includes(CONTENT_TYPE.JSON)) {
      console.log('라우트 로그 : 📤 JSON 요청 처리 (AI 생성)');
      const body = await req.json() as JsonRequestBody;
      
      // voiceModel과 transitionName이 없으면 기본값 설정
      const requestBody = {
        prompt: body.prompt,
        voiceModel: body.voiceModel || VOICE_TYPES[0].name,
        alt: body.alt || '',
        script: body.script || '',
        transitionName: body.transitionName || TRANSITION_TYPES[0].name
      };

      const response = await apiClient.post<SectionResponse>(
        `/projects/${projectId}/sections`,
        requestBody,
        {
          headers: {
            Cookie: req.headers.get('cookie'),
            'Content-Type': CONTENT_TYPE.JSON,
          },
        }
      );
      return NextResponse.json(response.data);
    }
    // 빈 요청 처리 (바디가 비어있거나 Content-Type이 없는 경우)
    else if (!contentType || contentType === '' || contentType === CONTENT_TYPE.MULTIPART || contentType === CONTENT_TYPE.JSON) {
      console.log('라우트 로그 : 📤 빈 요청 처리');
      const response = await apiClient.post<SectionResponse>(`/projects/${projectId}/sections`, {}, {
        headers: {
          Cookie: req.headers.get('cookie'),
          ...(contentType && { 'Content-Type': contentType }),
        },
      });
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