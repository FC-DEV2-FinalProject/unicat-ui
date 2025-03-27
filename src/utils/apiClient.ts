// src/utils/apiClient.ts
import axios from "axios";
import { createHttpsAgent } from "@/src/utils/httpsAgent"; // httpsAgent 가져오기

// 서버와 클라이언트 환경에 따라 다른 baseURL 설정
const baseURL = typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_API_URL  // 클라이언트 환경
    : process.env.API_URL;             // 서버 환경

const apiClient = axios.create({
    baseURL, // 환경에 맞는 baseURL 설정
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키를 자동으로 전송하도록 설정
    httpsAgent: createHttpsAgent(), // httpsAgent를 axios 인스턴스에 추가   
    // 개발 환경에서의 CORS 설정
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window === 'undefined') {  // 서버사이드(Next.js API 라우트)에서만
            const cookieHeader = config.headers['Cookie'] || config.headers['cookie'];
            if (cookieHeader) {
                // 원본 쿠키 유지
                config.headers['Cookie'] = cookieHeader;
                
                // Authorization 쿠키가 있는 경우 (로컬 환경)
                const authToken = cookieHeader.split('Authorization=')?.[1];
                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken.split(';')[0]}`;
                    config.headers['Cookie'] = `${authToken.split(';')[0]}`;
                }
                
                // _vercel_jwt 쿠키가 있는 경우 (Vercel 환경)
                const vercelToken = cookieHeader.split('_vercel_jwt=')?.[1];
                if (vercelToken) {
                    config.headers['Authorization'] = `Bearer ${vercelToken.split(';')[0]}`;
                    config.headers['Cookie'] = `${vercelToken.split(';')[0]}`;
                }
            }

            // 로깅
            console.log('🔄 Next.js -> 백엔드 요청 정보:', {
                url: config.url,
                method: config.method,
                headers: {
                    cookie: config.headers['Cookie'] || config.headers['cookie'],
                    authorization: config.headers['Authorization'],
                    allHeaders: config.headers
                }
            });
        }

        return config;
    },
    (error) => {
        if (typeof window === 'undefined') {  // 서버사이드 에러
            console.error('❌ Next.js -> 백엔드 요청 실패:', {
                url: error.config?.url,
                method: error.config?.method,
                headers: {
                    cookie: error.config?.headers['Cookie'] || error.config?.headers['cookie'],
                    authorization: error.config?.headers['Authorization'],
                    allHeaders: error.config?.headers
                },
                error: error.message
            });
        }
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        // 전체 응답 헤더 로깅
        console.log('📥 전체 응답 헤더:', response.headers);
        
        // 쿠키 관련 헤더만 따로 로깅
        const cookies = response.headers['set-cookie'];
        console.log('📥 응답의 쿠키 정보:', {
            'set-cookie': cookies || '쿠키 없음',
            authorization: response.headers['authorization'],
        });
        
        return response;
    },
    (error) => {
        // 에러 상황 로깅 추가
        console.error('❌ API 요청 실패:', {
            url: error.config?.url,
            method: error.config?.method,
            requestHeaders: {
                cookie: error.config?.headers['Cookie'] || error.config?.headers['cookie'],
                authorization: error.config?.headers['Authorization']
            },
            status: error.response?.status,
            statusText: error.response?.statusText,
            responseHeaders: error.response?.headers,
            responseData: error.response?.data,
            error: error.message
        });

        return Promise.reject(error);
    }
);

export default apiClient;
