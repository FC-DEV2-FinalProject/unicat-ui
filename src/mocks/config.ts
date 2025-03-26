export const MSW_CONFIG = {
  // 각 API별로 MSW 사용 여부를 설정
  // 일단 CONFIG에 따른 분기처리가 현재 프로젝트에서는 매우 힘듦으로 MSW는 전체 ON or 전체 OFF로 사용
  // BFF구조상 브라우저 핸들러에서 넥스트 api를 모킹하고 bypass옵션으로 분기가 false일시 통과 시켜야 하는데
  // 기본 401 요청이 날아오는 반면 bypass옵션으로 넘기면 500 에러가 나와서 개발완료 후 모킹 해제하여
  // 백단이랑 통신해야할듯

  // 현재는 테스트에서 분기로만 사용
  USE_MSW: {
    PROJECTS: false,  // /api/projects API는 MSW 사용
    ART_STYLES: false,  // /api/art-styles API는 실제 서버 사용
  }
} as const; 