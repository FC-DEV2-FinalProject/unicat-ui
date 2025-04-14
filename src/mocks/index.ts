// MSW 초기화 함수
async function initMocks() {
  try {
    console.log('🔄 MSW 초기화 시작 - 환경:', process.env.NODE_ENV);
    console.log('🔍 환경 변수 확인:');
    console.log('- NEXT_PUBLIC_API_MOCKING:', process.env.NEXT_PUBLIC_API_MOCKING);
    console.log('- NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('- API_URL:', process.env.API_URL);
    
    if (typeof window === "undefined") {
      // 서버 사이드
      console.log('🖥️ 서버 사이드 MSW 초기화');
      const { server } = await import("./server");
      server.listen({
        onUnhandledRequest: 'bypass',
      });
      console.log('✅ MSW Server is running');
    } else {
      // 클라이언트 사이드
      console.log('🌐 클라이언트 사이드 MSW 초기화');
      const { worker } = await import("./browser");
      worker.start({
        onUnhandledRequest: 'bypass',
      });
      console.log('✅ MSW Browser is running');
    }
  } catch (error) {
    console.error('❌ MSW 초기화 중 오류 발생:', error);
  }
}

// MSW 초기화 실행 - 프로덕션 환경에서도 자동으로 실행
if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  console.log('🚀 MSW 활성화됨 - 환경:', process.env.NODE_ENV);
  initMocks().catch(error => {
    console.error('❌ MSW 초기화 실패:', error);
  });
} else {
  console.log('⏭️ MSW 비활성화됨 - NEXT_PUBLIC_API_MOCKING:', process.env.NEXT_PUBLIC_API_MOCKING);
}

export { initMocks };