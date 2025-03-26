// src/utils/apiClient.ts
import axios from "axios";
import { createHttpsAgent } from "@/src/utils/httpsAgent"; // httpsAgent 가져오기
import { getCookie } from "cookies-next";

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
    httpsAgent: createHttpsAgent(), // httpsAgent를 axios 인스턴스에 추가   
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        console.log('📤 요청 헤더에 있는 쿠키:', {
            name: 'cookie',
            value: config.headers['cookie'] || config.headers['Cookie']
        });

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        // 응답 헤더에서 쿠키 정보 확인
        const cookies = response.headers['set-cookie'];
        console.log('📥 응답 헤더에 있는 쿠키:', cookies || '쿠키 없음');
        
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
