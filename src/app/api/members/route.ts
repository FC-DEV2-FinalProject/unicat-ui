import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

export async function GET(req: NextRequest) {
  try {
    console.log('🎯 Next.js API 라우터 - GET /members');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const response = await apiClient.get('/members', {
      headers: {
        Cookie: req.headers.get('cookie'),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ API 에러:', error);
    return NextResponse.json(
      { error: '멤버 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 