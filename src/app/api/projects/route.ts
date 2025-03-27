// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { projectService } from '@/src/services/projectService';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

// GET /projects
export async function GET() {
  try {
    const projects = await projectService.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /projects
export async function POST(req: NextRequest) {
  try {
    // 들어온 요청의 헤더와 쿠키 로깅
    console.log('📥 Next.js API 라우트 수신된 요청:', {
      headers: {
        cookie: req.headers.get('cookie'),
        authorization: req.headers.get('authorization'),
        allHeaders: Object.fromEntries(req.headers.entries())
      }
    });

    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      console.log('📝 요청 바디 없음 - 빈 객체 사용');
    }
    
    // apiClient로 백엔드 요청 보내기 전 로깅
    console.log('📤 백엔드로 보낼 요청 정보:', {
      url: '/projects',
      body,
      headers: {
        Cookie: req.headers.get('cookie')
      }
    });

    const response = await apiClient.post('/projects', body, {
      headers: {
        Cookie: req.headers.get('cookie')
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ Next.js API 라우트 에러:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requestHeaders: Object.fromEntries(req.headers.entries())
    });
    return NextResponse.json(
        { error: error instanceof Error ? error.message : String(error) }, 
        { status: 500 }
    );
  }
}
