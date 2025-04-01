// Logout.tsx 수정 버전
"use client";

import apiClient from "@/src/utils/apiClient"; // axios 대신 apiClient 임포트

export default function LogoutButton() {
  const handleLogout = async () => {
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!confirmed) return;

    try {
      await apiClient.delete("https://api.unicat.day/auth/sign-out", {}); // 헤더 생략
      alert("로그아웃이 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-[150px] h-[40px] bg-gray-400 rounded-lg text-white hover:bg-gray-700 flex items-center justify-center">
      로그아웃
    </button>
  );
}
