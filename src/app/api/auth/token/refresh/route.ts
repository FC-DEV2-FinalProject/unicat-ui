import { NextResponse } from 'next/server';
import apiClient from '@/src/utils/apiClient';
import { handleApiError } from '@/src/utils/apiErrorUtil';

export async function POST(request: Request) {
    try {
        // 요청에서 Authorization 헤더 추출
        const authHeader = request.headers.get('Authorization');
        console.log("authHeader", authHeader);
        // apiClient를 사용하여 외부 API 호출
        const response = await apiClient.post('/auth/token/refresh', null, {
            headers: {
                'Authorization': authHeader
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return handleApiError(error);
    }
} 