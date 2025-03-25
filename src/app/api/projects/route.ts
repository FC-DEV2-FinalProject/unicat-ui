// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { projectService } from '@/src/services/projectService';
import { handleApiError } from '@/src/utils/apiErrorUtil';

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
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await projectService.createProject(body);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Project creation error:", error);
    return handleApiError(error);
  }
}
