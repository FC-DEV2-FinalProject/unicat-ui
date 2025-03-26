import apiClient from "@/src/utils/apiClient";
import SocialLoginButton from "./components/SocialLoginButton";

interface OAuthLink {
  provider: string;
  link: string;
}

export default async function LoginPage() {
  // 서버 사이드에서 데이터 페칭
  const oauthLinks: OAuthLink[] = await apiClient
    .get("/auth/oauth-links")
    .then((response) => {
      // 각 OAuth URL에 redirect 파라미터 추가
      return response.data.map((item: OAuthLink) => {
        try {
          const redirectUrl = encodeURIComponent("https://unicat.day/");
          const separator = item.link.includes("?") ? "&" : "?";
          const newLink = `${item.link}${separator}redirect=${redirectUrl}`;
          console.log("Original URL:", item.link);
          console.log("Modified URL:", newLink);
          return {
            ...item,
            link: newLink,
          };
        } catch (error) {
          console.error("Error processing OAuth link:", error);
          return item; // 에러 발생 시 원본 URL 반환
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching OAuth links:", error);
      return [];
    });

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
          <form className="w-full group">
            <div className="w-full flex flex-col justify-center h-full mb-[56px]">
              <h1 className="mb-[36px] text-3xl font-bold self-start">
                로그인
              </h1>
              <div className="flex flex-col gap-4 mb-1">
                <div>
                  <h2 className="mb-1">이메일</h2>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    required
                  />
                </div>
                <div>
                  <h2 className="mb-1">비밀번호</h2>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="KeepLogining"
                  type="checkbox"
                  className="w-4 h-4 accent-[#7879F1] cursor-pointer"
                />
                <label htmlFor="KeepLogining" className="text-sm text-gray-600">
                  로그인 유지
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                type="submit"
                className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#C7C7C7] text-white group-valid:bg-[#7879F1]"
              >
                로그인
              </button>
              {oauthLinks.map((item: OAuthLink, index: number) => (
                <SocialLoginButton
                  key={index}
                  provider={item.provider}
                  link={item.link}
                />
              ))}
              <a className="text-md font-bold text-[#7879F1]" href="/sign-up">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
