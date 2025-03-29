"use client";

import axios from "axios";

interface LogoutButtonProps {
  token: string | number;
}

export default function LogoutButton({ token }: LogoutButtonProps) {
  const handleLogout = async () => {
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete("https://api.unicat.day/auth/sign-out", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
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
