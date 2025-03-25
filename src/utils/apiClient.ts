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
        // 요청 URL 출력
        console.log("API 클라이언트 : 요청된 URL:", config.baseURL ?? 'base' + config.url ?? '');
        //const token = getCookie("jwt_token"); // 쿠키에서 JWT 토큰 가져오기
        const token = "eyJraWQiOiJyc2EtcHJvZC1rZXktaWQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1Iiwic3Vic2NyaXB0aW9uIjoiQkFTSUMiLCJleHAiOjE3NDM0OTMyNTgsImlhdCI6MTc0Mjg4ODQ1OCwiZW1haWwiOiJ3aHdqZGFuQGdtYWlsLmNvbSJ9.PXbn8gsnXAi96OAjPzTHVxnpzLzR_aQLu2vgdgyFgxKFvY0h_cExINxzT_m6CLRkmJm70N5bz6eA3_0o0QrKDsUz76QReICi49CCDtIC1bR7jxJMMyVFdpN2op8mQn1fSfcBrbpFoIenCZxpf61Eo009Aq1mphLiCxcWv-IUZr6Qa-tqyrPSu-VsTjLots68vvu88xFp_eMQK33v-NzVfvCr-Hv-vYTugEwo_BE9cWSeKzU8YyYElmls52F17BdkjbGoBH3TX-JlpPtWK6pcsoury3wmvJ8IEVrLMhed6MQOY_K4P6tgaZUf4JD413lf7vtarlebD1sIjCDTi6Zq7g";
        console.log("API 클라이언트 : token", token);
        
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
        console.log("요청 중 오류 발생:", error.config?.baseURL ?? '' + error.config?.url ?? '');
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 새로운 JWT 토큰이 응답에 포함된 경우 쿠키에 저장
apiClient.interceptors.response.use(
    (response) => {
        const token = response.headers["authorization"];
        console.log("API 클라이언트 응답 : 응답 헤더의 토큰", token);
        if (token) {
            console.log("API 클라이언트 응답 : 새로운 토큰 쿠키에 저장", token);
            setCookie("jwt_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7일 동안 쿠키에 JWT 토큰 저장
        }
        return response;
    },
    (error) => {
        console.log("API 클라이언트 응답 : 에러 발생", error);
        return Promise.reject(error);
    }
);

export default apiClient;
