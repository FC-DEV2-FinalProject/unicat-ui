import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 이벤트 리스너 제한 증가
process.setMaxListeners(20);

console.log('🚀 Starting MSW Server...');

// 서버 사이드 MSW 설정
export const server = setupServer(...handlers);

server.listen({ 
  onUnhandledRequest: 'bypass'
});

console.log('✅ MSW Server is running');
console.log('📍 Registered handlers:', handlers.length);

// 종료 핸들러 강화
const cleanupServer = () => {
  console.log('🛑 Stopping MSW Server...');
  server.close();
  process.exit(0);
};

// 이벤트 리스너 등록 전 기존 리스너 제거
process.removeAllListeners('SIGINT');
process.removeAllListeners('SIGTERM');
process.removeAllListeners('exit');

process.on('SIGINT', cleanupServer);
process.on('SIGTERM', cleanupServer);
process.on('exit', cleanupServer); 