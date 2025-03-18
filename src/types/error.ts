import { AxiosError } from 'axios';

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