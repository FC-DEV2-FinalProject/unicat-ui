import { http, HttpResponse } from 'msw'
import { ART_STYLES } from '@/src/constants/artStyles';

interface ProjectBody {
  title: string;
  subtitle: string;
  scriptTone: string;
  imageStyle: string;
}

// 실제 백엔드 API URL을 모킹
const API_URL = process.env.API_URL;

// MSW를 사용할 API 엔드포인트만 여기에 정의
export const handlers = [
  // 프로젝트 목록 조회 API
  http.get(`${API_URL}/projects`, async ({  }) => {

    console.log('🔵 MSW Intercepted - GET /projects');

    return new HttpResponse(
      JSON.stringify([
        {
          id: 1,
          title: '샘플 프로젝트 1',
          subtitle: '부제목 1',
          thumbnailUrl: 'https://picsum.photos/800/600',
          artifactUrl: 'https://picsum.photos/800/600',
          scriptTone: 'casual',
          imageStyle: 'realistic',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: '샘플 프로젝트 2',
          subtitle: '부제목 2',
          thumbnailUrl: 'https://picsum.photos/800/600',
          artifactUrl: 'https://picsum.photos/800/600',
          scriptTone: 'formal',
          imageStyle: 'cartoon',
          createdAt: new Date().toISOString()
        }
      ]),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 프로젝트 생성 API
  http.post(`${API_URL}/projects`, async ({ request }) => {

    console.log('🔵 MSW Intercepted - POST /projects');
    const body = await request.json() as ProjectBody;
    console.log('Request body:', body);

    return new HttpResponse(
      JSON.stringify({
        id: Math.floor(Math.random() * 1000) + 1,
        title: body.title,
        subtitle: body.subtitle,
        thumbnailUrl: 'https://picsum.photos/800/600',
        artifactUrl: 'https://picsum.photos/800/600',
        scriptTone: body.scriptTone,
        imageStyle: body.imageStyle,
        createdAt: new Date().toISOString()
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 아트 스타일 목록 API
  http.get(`${API_URL}/art-styles`, async ({ request }) => {

    const headers = Object.fromEntries(request.headers.entries());
    if (!headers.authorization) {
      console.log('🔴 Unauthorized - No Authorization header');
      return new HttpResponse(null, { status: 404 });
    }

    console.log('🔵 MSW Intercepted - GET /art-styles');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));

    return new HttpResponse(
      JSON.stringify(ART_STYLES),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  })
]; 