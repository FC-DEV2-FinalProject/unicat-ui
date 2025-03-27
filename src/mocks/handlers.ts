import { http, HttpResponse } from 'msw'

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
    
    // 요청 헤더 로깅
    const headers = Object.fromEntries(request.headers.entries());
    // console.log('📤 Request Headers:', {
    //   cookie: headers.cookie,
    //   authorization: headers.authorization,
    //   allHeaders: headers
    // });

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
          'Content-Type': 'application/json',
          'Set-Cookie': `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`
        }
      }
    );
  }),
]; 