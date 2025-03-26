"use client";

interface SocialLoginButtonProps {
  provider: string;
  link: string;
}

export default function SocialLoginButton({
  provider,
  link,
}: SocialLoginButtonProps) {
  const handleSocialLogin = () => {
    // 백엔드에서 제공하는 OAuth URL로 리다이렉트
    window.location.href = link;
  };

  return (
    <button
      type="button"
      onClick={handleSocialLogin}
      className={`flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg ${
        provider.toLowerCase().includes("kakao")
          ? "bg-[#FEE500]"
          : provider.toLowerCase().includes("google")
          ? "bg-[#F2F2F2]"
          : "bg-[#F2F2F2]"
      }`}
    >
      <img
        src={`/images/${
          provider.toLowerCase().includes("kakao") ? "KaKao" : "Google"
        }.svg`}
        alt={`${provider} 로그인 아이콘`}
      />
      {provider} 로그인
    </button>
  );
}
