import Header from "@/src/components/layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description: "홈 페이지",
};

export default function HomeLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    </head>
    <body>
    {/* 공통 헤더 내용 */}
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-[1200px] min-h-[900px] mx-auto">
          {" "}
          {/* 최대 너비 1200px 고정 */}
          {children}
        </main>

        {/* 공통 푸터 내용 */}
        <footer className="bg-white text-gray-5 py-6 text-center border-t border-gray-200">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:underline">
                이용약관
              </a>
              <a href="#" className="hover:underline">
                개인정보처리방침
              </a>
              <a href="#" className="hover:underline">
                라이선스 준수
              </a>

              <p className="text-sm">
                고객문의 :{" "}
                <a
                  href="mailto:your-email@example.com"
                  className="text-blue-500 hover:underline"
                >
                  unicat-day@gmail.com
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </body>
    </html>
  );
}