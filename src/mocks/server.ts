import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 서버 사이드 MSW 설정
export const server = setupServer(...handlers);

// MSW 서버 시작
if (process.env.NODE_ENV === 'development') {
  server.listen();
}

// 서버 종료 시 MSW 서버도 종료
process.on('SIGTERM', () => {
  server.close();
}); 