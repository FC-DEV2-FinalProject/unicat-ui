"use client";

import React, { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function MyPage(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const eventSource = new EventSource(`https://api.unicat.day/projects/1/progress?token=${token}`, {
      withCredentials: true
    });

    eventSource.addEventListener('progress', (event) => {
      const progressValue = parseInt(event.data);
      setProgress(progressValue);

      if (progressValue === 100) {
        eventSource.close();
      }
    });

    eventSource.onerror = (error) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handlePlay = () => {
    router.push('/playing');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[90px] relative bg-gray-50 min-h-screen">
      <main className="flex flex-col w-full max-w-[700px] items-center gap-4 text-center relative flex-[0_0_auto]">
        <h1 className="font-bold text-2xl text-gray-800">
          방금 만든 이야기로 뉴스를 만들고 있어요!
        </h1>
        <h2 className="text-gray-600 font-normal">
          약 1분정도 소요될 예정이니, 화면을 끄지 말고 기다려주세요.
        </h2>
        
        <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-gray-600">
          {progress}%
        </div>

        {progress === 100 && (
          <button
            onClick={handlePlay}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            재생하기
          </button>
        )}
      </main>
    </div>
  );
}
