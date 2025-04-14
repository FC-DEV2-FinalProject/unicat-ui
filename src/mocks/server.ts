import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 이벤트 리스너 제한 증가
process.setMaxListeners(20);

// MSW 서버 설정
export const server = setupServer(...handlers);

// 서버 시작 (프로덕션과 개발 환경 모두에서 실행)
server.listen({
  onUnhandledRequest: 'bypass',
});

console.log('✅ MSW Server is running');

// 기존 리스너 제거
process.removeAllListeners('SIGINT');
process.removeAllListeners('SIGTERM');
process.removeAllListeners('exit');

// 서버 종료 시 정리
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});

process.on('exit', () => {
  server.close();
}); 