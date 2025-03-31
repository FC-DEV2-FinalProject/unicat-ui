import { NextResponse } from 'next/server';
import { handleApiError } from '@/src/utils/apiErrorUtil';
import { NextRequest } from 'next/server';
import apiClient from '@/src/utils/apiClient';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    console.log('🎯 POST 섹션 생성 /api/projects/${projectId}/sections');

    // 섹션 ID 생성 요청
    const response = await apiClient.post(`/projects/${projectId}/sections`, {}, {
      headers: {
        Cookie: req.headers.get('cookie'),
      },
    });
    
    console.log('Section Creation Response:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ Section Creation Error:', error);
    return handleApiError(error);
  }
} 