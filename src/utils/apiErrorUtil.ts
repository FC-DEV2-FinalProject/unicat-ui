// utils/errorUtils.ts
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface ApiError {
  response: {
    data: unknown;
    status: number;
  };
}

// Type guard 함수들
export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof Error && 'isAxiosError' in error;
}

export function isApiError(error: unknown): error is ApiError {
  return error !== null && 
         typeof error === 'object' && 
         'response' in error &&
         error.response !== null &&
         typeof error.response === 'object' &&
         'data' in error.response &&
         'status' in error.response;
}

// 에러 처리 함수
export function handleApiError(error: unknown) {
  // AxiosError 처리
  if (isAxiosError(error)) {
    return NextResponse.json(
      {
        error: '서버와 연결할 수 없습니다.',
        details: error.message,
      },
      { status: error.response?.status || 500 }
    );
  }

  // ApiError 처리
  if (isApiError(error)) {
    return NextResponse.json(
      {
        error: 'API 서버에서 오류가 발생했습니다.',
        details: error.response.data,
      },
      { status: error.response.status }
    );
  }

  // 그 외의 일반적인 오류 처리
  return NextResponse.json(
    { error: '알 수 없는 오류 발생', details: error instanceof Error ? error.message : '알 수 없는 오류' },
    { status: 500 }
  );
}
