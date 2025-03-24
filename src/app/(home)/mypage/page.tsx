import TossPaymentButton from "@/src/components/toss/Payment";
import { Card, CardContent } from "@/src/components/common/Card";
import React, { JSX } from "react";

const token =
  "eyJraWQiOiJyc2EtcHJvZC1rZXktaWQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0IiwiZXhwIjoxNzQyODk3MzU3LCJpYXQiOjE3NDIyOTI1NTcsImVtYWlsIjoia3JiN2tvcmVhQGdtYWlsLmNvbSIsInNjb3BlIjoiYWxsIn0.ijwHQlM1reuJ2qh5d1-1OIUBUduQOn7LcNtlXTGc3ppWVKGCNDuJ2jPHnKUu2afg835VFhnWWaa9le6mfsYiJmYh8xZMikGLSI8PhKdEEG3oguyOGNqAtpM_3WcV6Q7926P1ViS3wGCykx2sWeg_ULwOu5EFmiY8RsVuJ8fSwoP5zRvlLalYDf3B-IrcSkc1-skQEgKvE6YuRK_QkZWFGi3Mf-H62cCHwxnCzTnvp3j8vU1B2ANo4rTmVtI5SFqHSo-5cg6SZGe4ww0Rq7f637zjCq5SLVGFuEjMD-k7X4yfNP8Fb9J844VtRdNPMVU05D05xZQQ9Cy41aXsp01wjQ";

export default function MyPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-[90px] relative bg-purple-6 min-h-screen">
      <main className="flex flex-col w-full max-w-[700px] items-center gap-6 relative flex-[0_0_auto]">
        <h1 className="font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)] self-start">
          마이페이지
        </h1>
        <Card className="w-[700px] bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a] mx-auto">
          <CardContent className="flex flex-col w-full px-6 py-6">
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">이름</div>
              <div className="text-gray-5">지민영</div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">전화번호</div>
              <div className="text-gray-5">010-1234-1234</div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">구독정보</div>
              <div className="text-gray-5 mb-1">프리미엄 회원 : 2025.12.31</div>
              <TossPaymentButton token={token} />
            </div>

            <div className="w-full h-px bg-gray-4 my-4"></div>
            <div className="flex flex-col mb-4">
              <div className="text-gray-5 font-bold mb-4">링크</div>
              <div className="flex items-center">
                <div className="text-gray-5 font-medium mr-4">유튜브</div>
                <button className="w-[300px] h-[40px] bg-white border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center justify-center">
                  연동해제
                </button>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-gray-5 font-medium mr-4">비메오</div>
              <button className="w-[300px] h-[40px] bg-black rounded-lg text-white hover:bg-purple-2 flex items-center justify-center">
                연동하기
              </button>
            </div>
            <div className="w-full h-px bg-gray-4 my-4"></div>
            <div className="text-gray-5 font-bold mb-2">회원탈퇴</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
