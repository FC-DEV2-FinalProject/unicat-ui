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

let currentSectionId = 1;

const getNextSectionId = () => {
  if(currentSectionId >= 5){
    currentSectionId = 1;
  }
  currentSectionId = currentSectionId + 1;
  return currentSectionId;
};

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
  // http.post(`${API_URL}/projects/:projectId/sections`, async ({ request }) => {
  //   console.log('🔵 MSW Intercepted - POST /projects/:projectId/sections');
  //   console.log('Request URL:', request.url);
  //   console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
  //   const headers = Object.fromEntries(request.headers.entries());
  //   return new HttpResponse(
  //     JSON.stringify({ 
  //       id: getNextSectionId(),
  //       script: "string",
  //       sortOrder: 1,
  //       resourceUrl: "string",
  //       audioUrl: "string",
  //       videoUrl: "string"
  //     }),
  //     {
  //       status: 201,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Set-Cookie': `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`
  //       }
  //     }
  //   );
  // }),

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

  http.post(`${API_URL}/projects/:projectId/sections`, async ({ request }) => {
    console.log('🔵 MSW Intercepted - POST /projects/:projectId/sections');
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
      
      const sectionId = getNextSectionId();
      console.log('sectionId:', sectionId);
      let imageUrl;
      let responseScript;
      
      switch(sectionId) {
        case 4:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-5944168497568437387.jpeg';
          responseScript = '단 12주 만에 취업이 가능하다고?! 믿기 어렵겠지만, 진짜입니다!\n패스트캠퍼스의 혁신적인 부트캠프, 커널이 드디어 오픈했습니다!';
          break;
          //썸네일
        case 3:
          imageUrl = '/images/news-making/thumbnail_full.png';
          responseScript = ' ';
          break;
        case 5:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-5697023503459755461.jpeg';
          responseScript = '모집기간은 2025년 3월 24일부터 2025년 4월 16일까지라는데\n심지어 전액 무료';
          break;
        case 2:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-1206089953825404836.png';
          responseScript = '업계 최고의 멘토 이민석 강사님과 함께\n실무 중심의 커리큘럼으로 취업까지 완벽하게 준비할 수 있는 기회!\n지금 바로 지원하세요! 이 기회를 놓치면 후회할지도 모릅니다!';
          break;
        default:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-8096234655908682540.png';
          responseScript = '';
      }

      return HttpResponse.json({
        id: sectionId,
        imageUrl: imageUrl,
        alt: alt || '고양이 사진',
        script: responseScript || script || '스크립트 없음',
        voiceModel: voiceModel || '보이스 모델',
        transitionName: transitionName || '전환 효과',
      });

    } else {
      console.log('핸들러 로그 : 📤 JSON 요청 처리');
      const bodyData = await request.json() as {
        id: number;
        alt?: string;
        script?: string;
        voiceModel?: string;
        transitionName?: string;
      };
      const { alt, script, voiceModel, transitionName } = bodyData;
      
      console.log('🔄 요청 바디 : ', bodyData);
      
      const sectionId = getNextSectionId();
      console.log('json 요청 sectionId:', sectionId);
      let imageUrl;
      let responseScript;
      
      switch(sectionId) {
        case 4:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-5944168497568437387.jpeg';
          responseScript = '단 12주 만에 취업이 가능하다고?! 믿기 어렵겠지만, 진짜입니다!\n패스트캠퍼스의 혁신적인 부트캠프, 커널이 드디어 오픈했습니다!';
          break;
          //썸네일
        case 3:
          imageUrl = '/images/news-making/thumbnail_full.png';
          responseScript = ' ';
          break;
        case 5:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-5697023503459755461.jpeg';
          responseScript = '모집기간은 2025년 3월 24일부터 2025년 4월 16일까지라는데 심지어 전액 무료';
          break;
        case 2:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-1206089953825404836.png';
          responseScript = '업계 최고의 멘토 이민석 강사님과 함께\n실무 중심의 커리큘럼으로 취업까지 완벽하게 준비할 수 있는 기회!\n지금 바로 지원하세요! 이 기회를 놓치면 후회할지도 모릅니다!';
          break;
        default:
          imageUrl = 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-8096234655908682540.png';
          responseScript = '';
      }
      return new HttpResponse(
        JSON.stringify({
          id: sectionId,
          imageUrl: imageUrl,
          alt: alt || '대체 텍스트',
          script: responseScript || script,
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
          //imageUrl: 'https://i.imgur.com/P2ruiUz.jpeg',
          imageUrl: 'https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-8096234655908682540.png',
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

  // 프로젝트 아티팩트 생성 API
  http.post(`${API_URL}/projects/:projectId`, async ({ params, request }) => {
    const { projectId } = params;
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    console.log('🔵 MSW Intercepted - POST /projects/:projectId');
    console.log('projectId:', projectId);
    console.log('type:', type);
    return new HttpResponse(null, { status: 202 });
  }),

  // 마이페이지 핸들러
  http.get(`${API_URL}/members`, () => {
    console.log('🎯 MSW - GET /members');
    return new HttpResponse(
      JSON.stringify({
        name: "패스트캠퍼스",
        phoneNumber: "01012345678"
      }),
      { status: 200 }
    );
  }),
];
