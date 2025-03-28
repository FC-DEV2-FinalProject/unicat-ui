"use client";

import { useState, useEffect } from "react";
import apiClient from "@/src/utils/apiClient";
import SocialLoginButton from "@/src/components/SocialLoginButton";

interface OAuthLink {
  provider: string;
  link: string;
}

export default function SocialLoginSection() {
  const [oauthLinks, setOauthLinks] = useState<OAuthLink[]>([]);

  useEffect(() => {
    const fetchOAuthLinks = async () => {
      try {
        const response = await apiClient.get("/auth/oauth-links");
        console.log("OAuth 링크 응답:", response.data);

        const modifiedLinks = (
          response.data.providers ||
          response.data ||
          []
        ).map((item: OAuthLink) => {
          try {
            console.log("=== 소셜 로그인 처리 시작 ===");
            console.log("Provider:", item.provider);
            console.log("원본 링크:", item.link);

            // URL 파싱
            const url = new URL(item.link);
            console.log("=== URL 파싱 결과 ===");
            console.log("프로토콜:", url.protocol);
            console.log("호스트:", url.host);
            console.log("경로:", url.pathname);
            console.log("전체 파라미터:", url.search);

            // 새로운 redirect_uri 설정
            const redirectUrl = `${window.location.origin}/login/callback`;
            url.searchParams.set("redirect_uri", redirectUrl);

            console.log("=== 최종 URL ===", url.toString());

            return {
              ...item,
              link: url.toString(),
            };
          } catch (error) {
            console.error("Error processing OAuth link:", error);
            return item;
          }
        });
        setOauthLinks(modifiedLinks);
      } catch (error) {
        console.error("OAuth 링크를 가져오는데 실패했습니다:", error);
        setOauthLinks([]);
      }
    };

    fetchOAuthLinks();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {oauthLinks.map((item: OAuthLink, index: number) => (
        <SocialLoginButton
          key={index}
          provider={item.provider}
          link={item.link}
        />
      ))}
    </div>
  );
}
