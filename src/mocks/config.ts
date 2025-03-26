export const MSW_CONFIG = {
  // 각 API별로 MSW 사용 여부를 설정
  USE_MSW: {
    PROJECTS: false,  // /api/projects API는 MSW 사용
    ART_STYLES: true,  // /api/art-styles API는 실제 서버 사용
  }
} as const; 