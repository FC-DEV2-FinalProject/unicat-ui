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

process.once('SIGINT', () => {
  console.log('🛑 Stopping MSW Server...');
  server.close();
});
process.once('SIGTERM', () => {
  console.log('🛑 Stopping MSW Server...');
  server.close();
}); 