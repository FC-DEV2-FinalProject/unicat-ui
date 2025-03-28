"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import EmailLoginForm from "./components/EmailLoginForm";
import SocialLoginSection from "./components/SocialLoginSection";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // 이미 로그인된 상태인지 확인
    const token = getCookie("Authorization");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const handleLoginSuccess = () => {
    router.replace("/dashboard");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60%] h-full overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.2), transparent), url("/images/login-background.png")',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-start px-16 pt-16 text-white">
          <h2 className="text-4xl font-bold mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
            AI를 활용해 쉽게 만드는 뉴스
          </h2>
          <h3 className="w-[50%] text-md break-keep [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
            뉴스 만들기를 눌러서 나의 기사를 바탕으로 뉴스를 만들어 유튜브까지
            한번에 공유할 수 있습니다 :)
          </h3>
        </div>
      </div>
      <div className="w-[40%]">
        <div className="w-[350px] flex flex-col items-center justify-center h-full mx-auto">
          <div className="w-full flex flex-col gap-4">
            <EmailLoginForm onLoginSuccess={handleLoginSuccess} />
            <SocialLoginSection />
            <a className="text-md font-bold text-[#7879F1]" href="/sign-up">
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
