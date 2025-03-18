// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import apiClient from '@/src/utils/apiClient'; // 만든 apiClient 임포트
import { handleApiError } from '@/src/utils/apiErrorUtil'; // 서버사이드 통합 에러 핸들러

// GET /projects
export async function GET() {
  try {
    // apiClient를 사용하여 API 호출
    const response = await apiClient.get('/projects'); // apiClient.get으로 요청

    // 성공적인 응답 반환
    return NextResponse.json(response.data); // 받은 데이터를 클라이언트로 반환
  } catch (error) {
    // 유틸리티 함수에서 에러 처리
    return handleApiError(error);
  }
}

// POST /projects
export async function POST() {
  try {
    // apiClient를 사용하여 API 호출
    const response = await apiClient.post('/projects'); // apiClient.post으로 요청

    // 성공적인 응답 반환
    return NextResponse.json(response.data); // 받은 데이터를 클라이언트로 반환
  } catch (error) {
    // 유틸리티 함수에서 에러 처리
    return handleApiError(error);
  }
}
