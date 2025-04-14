import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// 브라우저 환경에서 MSW가 항상 실행되도록 설정
worker.start({
  onUnhandledRequest: 'bypass',
})

console.log('✅ MSW Browser is running')