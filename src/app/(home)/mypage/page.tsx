"use client";

import React, { JSX, useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/common/Card";
import TossPaymentButton from "@/src/components/toss/Payment";
import LogoutButton from "@/src/components/auth/Logout";
import EditProfileButton from "@/src/components/auth/EditProfile";
import apiClient from "@/src/utils/apiClient";

interface MemberData {
  name: string;
  phoneNumber: string;
}

const formatPhoneNumber = (phone: string) => {
  if (!phone || phone === "정보없음") return phone;
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

export default function MyPage(): JSX.Element {
  const [memberData, setMemberData] = useState<MemberData>({
    name: " ",
    phoneNumber: " ",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMemberData = async () => {
    try {
      const response = await apiClient.get("https://api.unicat.day/members", {});
      const data = response.data;
      setMemberData({
        name: data.name || "정보없음",
        phoneNumber: data.phoneNumber || "정보없음",
      });
    } catch (error) {
      console.error("멤버 정보 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <div className="text-gray-5 text-lg">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[90px] relative mt-10">
      <main className="flex flex-col w-full max-w-[700px] items-center gap-6 relative flex-[0_0_auto]">
        <h1 className="font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)] self-start">
          마이페이지
        </h1>

        <Card className="w-[700px] bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a] mx-auto">
          <CardContent className="flex flex-col w-full px-6 py-6">
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">이름</div>
              <div className="text-gray-5">{memberData.name}</div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">전화번호</div>
              <div className="text-gray-5">{formatPhoneNumber(memberData.phoneNumber)}</div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">구독정보</div>
              <div className="text-gray-5 mb-1">프리미엄 회원 : 2025.12.31</div>
              <TossPaymentButton />
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
            <div className="flex items-center ">
              <LogoutButton />
              <EditProfileButton
                initialName={memberData.name}
                initialPhoneNumber={memberData.phoneNumber}
                onUpdate={fetchMemberData}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
