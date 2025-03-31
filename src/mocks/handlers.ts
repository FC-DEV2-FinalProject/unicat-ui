import { http, HttpResponse } from "msw";
import { DashboardResponse } from "@/src/types/DashboardTypes";
import { mockDashboardData } from "./data";

interface ProjectBody {
  title: string;
  subtitle: string;
  scriptTone: string;
  imageStyle: string;
}

// 실제 백엔드 API URL을 모킹
const API_URL = process.env.API_URL;

const createSectionIdGenerator = () => {
  let counter = 1;
  return () => counter++;
};
const getNextSectionId = createSectionIdGenerator();

// MSW를 사용할 API 엔드포인트만 여기에 정의
export const handlers = [
  // 프로젝트 목록 조회 API
  http.get(`${API_URL}/projects`, async ({}) => {
    console.log("🔵 MSW Intercepted - GET /projects");

    return new HttpResponse(
      JSON.stringify([
        {
          id: 1,
          title: "샘플 프로젝트 1",
          subtitle: "부제목 1",
          thumbnailUrl: "https://picsum.photos/800/600",
          artifactUrl: "https://picsum.photos/800/600",
          scriptTone: "casual",
          imageStyle: "realistic",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "샘플 프로젝트 2",
          subtitle: "부제목 2",
          thumbnailUrl: "https://picsum.photos/800/600",
          artifactUrl: "https://picsum.photos/800/600",
          scriptTone: "formal",
          imageStyle: "cartoon",
          createdAt: new Date().toISOString(),
        },
      ]),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),

  http.post(`${API_URL}/projects/:projectId/sections`, async ({ request }) => {
    console.log("🔵 MSW Intercepted - POST /projects/:projectId/sections");
    const headers = Object.fromEntries(request.headers.entries());
    return new HttpResponse(
      JSON.stringify({
        id: getNextSectionId(),
        script: "string",
        sortOrder: 1,
        resourceUrl: "string",
        audioUrl: "string",
        videoUrl: "string",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  }),

  // 프로젝트 생성 API
  http.post(`${API_URL}/projects`, async ({ request }) => {
    console.log("🔵 MSW Intercepted - POST /projects");

    // 요청 헤더 로깅
    const headers = Object.fromEntries(request.headers.entries());
    // console.log('📤 Request Headers:', {
    //   cookie: headers.cookie,
    //   authorization: headers.authorization,
    //   allHeaders: headers
    // });

    const body = (await request.json()) as ProjectBody;
    console.log("Request body:", body);

    return new HttpResponse(
      JSON.stringify({
        id: Math.floor(Math.random() * 1000) + 1,
        title: body.title,
        subtitle: body.subtitle,
        thumbnailUrl: "https://picsum.photos/800/600",
        artifactUrl: "https://picsum.photos/800/600",
        scriptTone: body.scriptTone,
        imageStyle: body.imageStyle,
        createdAt: new Date().toISOString(),
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `Authorization=${headers.authorization}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  }),

  http.post("/projects/:projectId/sections/:sectionId", async ({ request }) => {
    const contentType = request.headers.get("Content-Type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      //const image = formData.get('image');
      const alt = formData.get("alt");
      const script = formData.get("script");
      //const voiceName = formData.get('voiceName');

      return HttpResponse.json({
        imageUrl: "https://api.unicat.day/sample.png",
        alt: alt || "고양이 사진",
        script: script || "고양이를 키울 때 알고 있어야 할 주의사항에 대해 알아보겠습니다.",
      });
    } else {
      const { prompt } = (await request.json()) as { prompt: string };
      const url = new URL(request.url);
      const type = url.searchParams.get("type");
      //const transitionName = url.searchParams.get('transitionName');

      // type에 따른 응답 분기
      if (type === "image") {
        return HttpResponse.json({
          imageUrl: "https://api.unicat.day/sample.png",
          alt: `'${prompt}' 내용을 기반으로 AI가 생성한 이미지`,
          script: null,
        });
      } else if (type === "script") {
        return HttpResponse.json({
          imageUrl: null,
          alt: null,
          script: "AI를 통해 생성된 텍스트 내용",
        });
      } else {
        // type이 없는 경우 (이미지 + 스크립트)
        return HttpResponse.json({
          imageUrl: "https://api.unicat.day/sample.png",
          alt: `'${prompt}' 내용을 기반으로 AI가 생성한 이미지`,
          script: "AI를 통해 생성된 텍스트 내용",
        });
      }
    }
  }),

  // 대시보드 프로젝트 목록 조회 API
  http.get(`${API_URL}/dashboard`, async () => {
    console.log("🔵 MSW Intercepted - GET /dashboard");
    return HttpResponse.json(mockDashboardData);
  }),
];
