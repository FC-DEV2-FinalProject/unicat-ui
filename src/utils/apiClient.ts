// src/utils/apiClient.ts
import axios from "axios";
import { getCookie, setCookie } from "cookies-next"; // 쿠키에서 JWT 토큰을 가져오고 설정하는 유틸리티
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
    httpsAgent: createHttpsAgent(), // httpsAgent를 axios 인스턴스에 추가   
});

// 요청 인터셉터: 각 요청에 JWT 토큰을 헤더에 추가
apiClient.interceptors.request.use(
    (config) => {
        console.log("요청된 URL:", config.baseURL ?? 'base' + config.url ?? '');
        const token = getCookie("jwt_token");
        console.log("token", token);
        
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // JWT 토큰을 Authorization 헤더에 추가
        } else {
            // 쿠키에 토큰이 없을 경우 요청 헤더에서 토큰 가져오기
            const authHeader = config.headers["Authorization"] as string;
            if (authHeader?.startsWith('Bearer ')) {
                console.log("Using token from request header");
            } else {
                console.log("No token available");
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 새로운 JWT 토큰이 응답에 포함된 경우 쿠키에 저장
apiClient.interceptors.response.use(
    (response) => {
        console.log("API 응답 전체 헤더:", response.headers);
        
        // 1. Set-Cookie로 토큰이 온 경우 (백엔드에서 직접 쿠키 설정)
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
            console.log("백엔드에서 Set-Cookie로 토큰 설정됨");
            return response;
        }

        // 2. Authorization 헤더로 토큰이 온 경우
        const token = response.headers["authorization"];
        if (token) {
            console.log("Authorization 헤더에서 새 토큰 발견, 쿠키에 저장:", token);
            setCookie("jwt_token", token, { maxAge: 60 * 60 * 24 * 7 });
        }
        
        return response;
    },
    (error) => {
        console.error("API 에러 응답:", error.response);
        if (error.response) {
            console.log("에러 응답 헤더:", error.response.headers);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
