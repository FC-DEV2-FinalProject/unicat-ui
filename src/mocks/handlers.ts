import { http, HttpResponse } from 'msw'
import { mockDashboardData } from "./data";

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
  // 섹션만 생성
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
        status: 201,
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
    //console.log('Request Headers:', Object.fromEntries(request.headers.entries()));

    const contentType = request.headers.get('Content-Type');
    console.log('Content-Type:', contentType);
    const headers = Object.fromEntries(request.headers.entries());
    if (contentType?.startsWith('multipart/form-data')) {
      console.log('핸들러 로그 : 📤 FormData 요청 처리');
      const formData = await request.formData();
      const alt = formData.get('alt');
      const script = formData.get('script');
      const voiceModel = formData.get('voiceModel');
      const transitionName = formData.get('transitionName');
      console.log('FormData:', formData.get('script'));
      return HttpResponse.json({
        imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
        alt: alt || '고양이 사진',
        script: script || '고양이를 키울 때 알고 있어야 할 주의사항에 대해 알아보겠습니다.',
        voiceModel: voiceModel || '보이스 모델',
        transitionName: transitionName || '전환 효과',
      });

    } else {
      console.log('핸들러 로그 : 📤 JSON 요청 처리');
      const bodyData = await request.json() as {
        alt?: string;
        script?: string;
        voiceModel?: string;
        transitionName?: string;
      };
      const { alt, script, voiceModel, transitionName } = bodyData;
      
      console.log('🔄 요청 바디 : ', bodyData);
      return new HttpResponse(
        JSON.stringify({
          id: Math.floor(Math.random() * 1000) + 1,
          imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
          alt: alt || '대체 텍스트',
          script: `'${script}' 내용을 기반으로 AI가 생성한 이미지`,
          voiceModel: voiceModel || '보이스 모델',
          transitionName: transitionName || '전환 효과',
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`
          }
        }
      );

    }
  }),

  // 새로 변경된 엔드포인트
  http.post(`${API_URL}/projects/:projectId/sections/:sectionId/ai`, async ({ request }) => {
    console.log('🔵 MSW Intercepted - POST /projects/:projectId/sections/:sectionId/ai');
    console.log('Request URL:', request.url);
    //console.log('Request Headers:', Object.fromEntries(request.headers.entries()));

    console.log('핸들러 로그 : 📤 AI 요청');
    const bodyData = await request.json() as {
        prompt?: string;
      };
      const { prompt } = bodyData;
      
      console.log('🔄 요청 바디 : ', bodyData);
      return new HttpResponse(
        JSON.stringify({
          imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
          alt: '대체 텍스트',
          script: `'${prompt}' 내용을 기반으로 AI가 생성한 이미지`,
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  }),

  // 대시보드 프로젝트 목록 조회 API
  http.get(`${API_URL}/dashboard`, async () => {
    console.log("🔵 MSW Intercepted - GET /dashboard");
    return HttpResponse.json(mockDashboardData);
  }),

  // 섹션 업데이트 PATCH 핸들러
  http.patch(`${API_URL}/projects/:projectId/sections/:sectionId`, async ({ request }) => {
    console.log('🔵 MSW Intercepted - PATCH /projects/:projectId/sections/:sectionId');
    console.log('Request URL:', request.url);
    
    const contentType = request.headers.get('Content-Type');
    console.log('Content-Type:', contentType);

    if (contentType?.startsWith('multipart/form-data')) {
      console.log('핸들러 로그 : 📤 FormData 요청 처리');
      const formData = await request.formData();
      const alt = formData.get('alt');
      const script = formData.get('script');
      const voiceModel = formData.get('voiceModel');
      const transitionName = formData.get('transitionName');
      
      console.log('FormData:', {
        alt,
        script,
        voiceModel,
        transitionName
      });

      // 204 No Content 응답 반환
      return new HttpResponse(null, {
        status: 204,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } 
    else if (contentType?.includes('application/json')) {
      console.log('핸들러 로그 : 📤 JSON 요청 처리');
      const body = await request.json() as {
        imageUrl?: string;
        alt?: string;
        script?: string;
        voiceModel?: string;
        transitionName?: string;
      };
      
      console.log('🔄 JSON 요청 바디:', body);
      
      // 204 No Content 응답 반환
      return new HttpResponse(null, {
        status: 204,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new HttpResponse(
      JSON.stringify({ error: '지원하지 않는 Content-Type입니다.' }),
      { status: 400 }
    );
  }),
];
