import "@/src/styles/tailwind.css";
import "@/src/styles/globals.css";
import Header from "@/src/components/layout/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-purple-6 min-h-screen flex flex-col">
            {/* 공통 헤더 */}
            <Header className="h-[100px]" />

            {/* 메인 콘텐츠 */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full mt-[105px]">
                {children}
            </main>

            {/* 공통 푸터 */}
            <footer className="h-[100px] bg-purple-6 text-gray-5 py-6 text-center border-t border-gray-200">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:underline">이용약관</a>
                        <a href="#" className="hover:underline">개인정보처리방침</a>
                        <a href="#" className="hover:underline">라이선스 준수</a>
                    </div>
                    <p className="text-sm">
                        고객문의 : <a href="mailto:your-email@example.com" className="text-blue-500 hover:underline">
                        your-email@example.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
