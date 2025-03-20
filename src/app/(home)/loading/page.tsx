import React, { JSX } from "react";

export default function MyPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-[90px] relative bg-gray-50 min-h-screen">
      <main className="flex flex-col w-full max-w-[700px] items-center gap-4 text-center relative flex-[0_0_auto]">
        <h1 className="font-bold text-2xl text-gray-800">
          방금 만든 이야기로 뉴스를 만들고 있어요!
        </h1>
        <h2 className="text-gray-600 font-normal">
          약 2분정도 소요될 예정이니, 화면을 끄지 말고 기다려주세요.
        </h2>
      </main>
    </div>
  );
}
