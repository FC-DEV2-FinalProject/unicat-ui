import { setupServer } from 'msw/node';
import { handlers } from './handlers';

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

process.on('SIGINT', cleanupServer);
process.on('SIGTERM', cleanupServer);
process.on('exit', cleanupServer); 