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

    // TODO: 나중에 FormData 처리 다시 추가 필요
    // 서버에 이미지 첨부 시 이미지 전달이 필요함
    // 현재는 JSON 요청만 처리하도록 임시로 수정됨

    let requestBody: JsonRequestBody = {
      voiceModel: VOICE_TYPES[0].name,
      alt: '',
      script: '',
      transitionName: TRANSITION_TYPES[0].name
    };

    // 바디가 있는 경우에만 파싱
    if (req.body) {
      try {
        const body = await req.json() as JsonRequestBody;
        console.log('JSON 데이터:', body);
        
        requestBody = {
          prompt: body.prompt,
          voiceModel: body.voiceModel || VOICE_TYPES[0].name,
          alt: body.alt || '',
          script: body.script || '',
          transitionName: body.transitionName || TRANSITION_TYPES[0].name
        };
      } catch {
        console.log('바디 파싱 실패, 기본값 사용');
      }
    }

    console.log('요청 본문:', requestBody);

    console.log('API 클라이언트로 요청 전송...');
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
    console.log('API 클라이언트 응답:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ API 에러:', error);
    return handleApiError(error);
  }
} 