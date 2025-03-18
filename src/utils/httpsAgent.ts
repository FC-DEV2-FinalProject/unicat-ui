// utils/httpsAgent.ts
import https from 'https';

interface HttpsAgentOptions extends https.AgentOptions {
  cert?: Buffer | string;
  key?: Buffer | string;
  servername?: string;
}

// SSL 인증서 옵션을 가져오는 함수
export function getHttpsAgentOptions(): HttpsAgentOptions {
  const options: HttpsAgentOptions = {
    rejectUnauthorized: false, // 인증서 검증 비활성화
  };

  // production 환경에서는 인증서를 사용하지 않도록 설정
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    console.log('Production 환경에서는 SSL 인증서를 사용하지 않습니다.');
    return options; // 인증서 없이 기본 옵션만 반환
  }

  try {
    // 로컬 환경에서 인증서를 사용하기 위한 코드
    if (process.env.CERT_BASE64 && process.env.KEY_BASE64) {
        // Base64로 인코딩된 인증서와 키를 환경 변수에서 가져옴
      const certBase64 = process.env.CERT_BASE64;
      const keyBase64 = process.env.KEY_BASE64;

      // 환경 변수가 없으면 오류를 던지도록 처리
      if (!certBase64 || !keyBase64) {
        throw new Error('Certificate or Key is not defined in environment variables');
      }

      // Base64로 인코딩된 값을 디코딩하여 Buffer로 변환
      const cert = Buffer.from(certBase64, 'base64');
      const key = Buffer.from(keyBase64, 'base64');

      return {
        ...options,
        cert,
        key,
        servername: process.env.SSL_SERVER_NAME,
      };
    }
    console.log('로컬 SSL 인증서 설정이 없습니다.');
  } catch (err: unknown) {
    console.log(err);
    console.log('SSL 인증서 파일을 찾을 수 없습니다.');
  }

  return options; // 인증서가 없으면 기본 옵션 반환
}

export function createHttpsAgent() {
  const agentOptions = getHttpsAgentOptions();
  return new https.Agent(agentOptions); // https.Agent 생성
}
