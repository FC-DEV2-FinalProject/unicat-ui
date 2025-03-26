import { http } from 'msw'
import { ART_STYLES } from '@/src/constants/artStyles';
import { MSW_CONFIG } from './config';

interface ProjectBody {
  title: string;
  subtitle: string;
  scriptTone: string;
  imageStyle: string;
}

// MSW를 사용할 API 엔드포인트만 여기에 정의
export const handlers = [
  // 프로젝트 목록 조회 API
  http.get('/api/projects', async () => {
    if (!MSW_CONFIG.USE_MSW.PROJECTS) {
      console.log('🔴 MSW Bypassed - GET /api/projects (Using real API)');
      return new Response(null, { status: 404 }); // MSW를 사용하지 않으면 404를 반환하여 실제 API로 요청이 전달되도록 함
    }

    console.log('🔵 MSW Intercepted - GET /api/projects');
    console.log('Request handled by MSW mock handler');
    return new Response(JSON.stringify([
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
    ]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }),

  // 프로젝트 생성 API
  http.post('/api/projects', async ({ request }) => {
    if (!MSW_CONFIG.USE_MSW.PROJECTS) {
      console.log('🔴 MSW Bypassed - POST /api/projects (Using real API)');
      return new Response(null, { status: 404 });
    }

    console.log('🔵 MSW Intercepted - POST /api/projects');
    const body = await request.json() as ProjectBody;
    console.log('Request body:', body);

    // 실제 API 응답 형식과 동일하게 맞춤
    return new Response(JSON.stringify({
      id: Math.floor(Math.random() * 1000) + 1,
      title: body.title,
      subtitle: body.subtitle,
      thumbnailUrl: 'https://picsum.photos/800/600',
      artifactUrl: 'https://picsum.photos/800/600',
      scriptTone: body.scriptTone,
      imageStyle: body.imageStyle,
      createdAt: new Date().toISOString()
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }),

  // 아트 스타일 목록 API
  http.get('/api/art-styles', async () => {
    if (!MSW_CONFIG.USE_MSW.ART_STYLES) {
      console.log('🔴 MSW Bypassed - GET /api/art-styles (Using real API)');
      return new Response(null, { status: 404 }); // MSW를 사용하지 않으면 404를 반환하여 실제 API로 요청이 전달되도록 함
    }

    console.log('🔵 MSW Intercepted - GET /api/art-styles');
    console.log('Request handled by MSW mock handler');
    return new Response(JSON.stringify(ART_STYLES), {
      headers: { 'Content-Type': 'application/json' }
    });
  })
]; 