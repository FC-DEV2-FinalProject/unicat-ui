"use client"; // ✅ 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";

export default function OAuthLogin() {
  const [oauthLinks, setOauthLinks] = useState([]);

  useEffect(() => {
    fetch("api/auth") // API 요청
      .then((response) => response.json())
      .then((data) => setOauthLinks(data)) // API 응답 저장
      .catch((error) => console.error("Error fetching OAuth links:", error));
  }, []);

  console.log(oauthLinks);
  return (
    <div>
      <h1>간편 로그인</h1>
      {oauthLinks.length > 0 ? (
        <div>
          {oauthLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => (window.location.href = (item as {link: string}).link)} // OAuth 인증 페이지로 이동
              style={{
                padding: "10px 20px",
                margin: "10px",
                borderRadius: "5px",
                backgroundColor: "#4285F4",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {(item as {provider: string}).provider} 로그인
            </button>
          ))}
        </div>
      ) : (
        <p>로그인 방법을 불러오는 중...</p>
      )}
    </div>
  );
}