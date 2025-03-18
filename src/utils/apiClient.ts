// src/utils/apiClient.ts
import axios from "axios";
import { getCookie, setCookie } from "cookies-next"; // 쿠키에서 JWT 토큰을 가져오고 설정하는 유틸리티
import { createHttpsAgent } from "@/src/utils/httpsAgent"; // httpsAgent 가져오기

const apiClient = axios.create({
    baseURL: process.env.API_URL, // 기본 URL 설정
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    httpsAgent: createHttpsAgent(), // httpsAgent를 axios 인스턴스에 추가
});

// 요청 인터셉터: 각 요청에 JWT 토큰을 헤더에 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = getCookie("jwt_token"); // 쿠키에서 JWT 토큰 가져오기
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // JWT 토큰을 Authorization 헤더에 추가
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
        const token = response.headers["authorization"];
        if (token) {
            setCookie("jwt_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7일 동안 쿠키에 JWT 토큰 저장
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
