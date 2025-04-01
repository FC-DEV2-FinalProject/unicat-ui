import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/src/utils/apiClient"; // apiClient 임포트
import { handleApiError } from "@/src/utils/apiErrorUtil"; // 서버사이드 통합 에러 핸들러

// GET 요청
export async function GET(req: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await context.params;  // URL에서 projectId를 비동기로 추출
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH 요청
export async function PATCH(req: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await context.params;  // URL에서 projectId를 비동기로 추출
  try {
    const body = await req.json();  // 요청 본문 읽기
    const response = await apiClient.patch(`/projects/${projectId}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE 요청
export async function DELETE(req: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await context.params;  // URL에서 projectId를 비동기로 추출
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST 요청 (아티팩트 생성)
export async function POST(req: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await context.params;
  try {
    //const type = req.nextUrl.searchParams.get('type');

    const response = await apiClient.post(`/projects/${projectId}?type=artifact`);
    return new NextResponse(response.data, { status: 202 });
  } catch (error) {
    return handleApiError(error);
  }
}
