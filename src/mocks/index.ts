async function initMocks() {
    if (typeof window === "undefined") {
      const { server } = await import("./server");
      server.listen({
        onUnhandledRequest: 'bypass',
      });
      console.log('✅ MSW Server is running');
    } else {
      const { worker } = await import("./browser");
      worker.start({
        onUnhandledRequest: 'bypass',
      });
      console.log('✅ MSW Browser is running');
    }
  }
  
  initMocks();
  
  export {};