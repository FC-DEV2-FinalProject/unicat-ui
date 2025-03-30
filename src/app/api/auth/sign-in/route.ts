import { NextResponse } from 'next/server';
import apiClient from '@/src/utils/apiClient';
import { handleApiError } from '@/src/utils/apiErrorUtil';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // apiClient를 사용하여 백엔드 API 호출
    const response = await apiClient.post('/auth/sign-in', {
      email: email.trim(),
      password,
    });

    // 백엔드에서 받은 응답 데이터
    const data = response.data;
    
    // Next.js Response 생성
    const nextResponse = NextResponse.json(data);
    
    // 백엔드에서 받은 쿠키 헤더가 있다면 추가
    const setCookieHeader = response.headers['set-cookie'];
    if (Array.isArray(setCookieHeader)) {
      setCookieHeader.forEach(cookie => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;
  } catch (error) {
    // 유틸리티 함수에서 에러 처리
    return handleApiError(error);
  }
} 