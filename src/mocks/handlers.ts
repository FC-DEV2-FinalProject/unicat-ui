import { http, HttpResponse } from 'msw'

interface ProjectBody {
  title: string;
  subtitle: string;
  scriptTone: string;
  imageStyle: string;
}

// 실제 백엔드 API URL을 모킹
const API_URL = process.env.API_URL;

const createSectionIdGenerator = () => {
  let counter = 1;
  return () => counter++;
};
const getNextSectionId = createSectionIdGenerator();

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

  http.post(`${API_URL}/projects/:projectId/sections`, async ({ request }) => {
    console.log('🔵 MSW Intercepted - POST /projects/:projectId/sections');
    console.log('Request URL:', request.url);
    console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
    const headers = Object.fromEntries(request.headers.entries());
    return new HttpResponse(
      JSON.stringify({ 
        id: getNextSectionId(),
        script: "string",
        sortOrder: 1,
        resourceUrl: "string",
        audioUrl: "string",
        videoUrl: "string"
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`
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

  http.post(`${API_URL}/projects/:projectId/sections/:sectionId`, async ({ request }) => {
    console.log('🔵 MSW Intercepted - POST /projects/:projectId/sections/:sectionId');
    console.log('Request URL:', request.url);
    console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
    
    const contentType = request.headers.get('Content-Type');
    console.log('Content-Type:', contentType);

    if (contentType?.startsWith('multipart/form-data')) {
      console.log('📤 FormData 요청 처리');
      const formData = await request.formData();
      const alt = formData.get('alt');
      const script = formData.get('script');

      return HttpResponse.json({
        imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
        alt: alt || '고양이 사진',
        script: script || '고양이를 키울 때 알고 있어야 할 주의사항에 대해 알아보겠습니다.'
      });

    } else {
      console.log('📤 JSON 요청 처리');
      const { prompt } = await request.json() as { prompt: string };
      console.log('Prompt:', prompt);
      
      const url = new URL(request.url);
      const type = url.searchParams.get('type');
      console.log('Type:', type);

      // type에 따른 응답 분기
      if (type === 'image') {
        console.log('🖼️ 이미지만 생성');
        return HttpResponse.json({
          imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
          alt: `'${prompt}' 내용을 기반으로 AI가 생성한 이미지`,
          script: null
        });
      } else if (type === 'script') {
        console.log('📝 스크립트만 생성');
        return HttpResponse.json({
          imageUrl: null,
          alt: null,
          script: 'AI를 통해 생성된 텍스트 내용'
        });
      } else {
        console.log('🔄 이미지 + 스크립트 생성');
        return HttpResponse.json({
          imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
          alt: `'${prompt}' 내용을 기반으로 AI가 생성한 이미지`,
          script: 'AI를 통해 생성된 텍스트 내용'
        });
      }
    }
  })
]; 