"use client";

import React, { JSX, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/src/components/common/Card";
import TossPaymentButton from "@/src/components/toss/Payment";
import LogoutButton from "@/src/components/auth/Logout";

interface MemberData {
  name: string;
  phoneNumber: string;
}

const dummyToken =
  "eyJraWQiOiJyc2EtcHJvZC1rZXktaWQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQzODQxMDM1LCJpYXQiOjE3NDMyMzYyMzUsInBsYW4iOiJCQVNJQyIsImVtYWlsIjoia216MDQxNDAxQGdtYWlsLmNvbSJ9.KwAsjfUofsMi-5MbsdqAohSAWC3tEHd521s9kc6xRGnSVHWQcGJnxzOvuVJQfc5974HTDGVt0saGewSSFxHbaefzh7FacZ5T3NVpk7SRDuwBFrPqnenp8QWW_rYyjq_FrjjYAFb-oZZeEdN3w02Jq51bq6OGVwBAK7PKxjD2S2XjXhvLZcUmd2eZbLteQ7LAPKtLe4Ir50xCLwTU-0fcWBx-2TuqbMevFXfPgtb8Y9aTqIieC_0YmyG6MAFTv4gW-OFoy6m8jJSBpuJ8gtSgos1P6yruYBisAfC4_r2wYwJVCnWCUDVCLs_GvtuhIlCGMvpyyFZOM-QHJ-LMGXCD3A";

export default function MyPage(): JSX.Element {
  const [memberData, setMemberData] = useState<MemberData>({
    name: "정보없음",
    phoneNumber: "정보없음",
  });
  const token = Cookies.get("Authorization") ? 0 : dummyToken;

  useEffect(() => {
    fetch("https://api.unicat.day/members", {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMemberData({
          name: data.name ? data.name : "정보없음",
          phoneNumber: data.phoneNumber ? data.phoneNumber : "정보없음",
        });
      });
  }, [token]);

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
              <div className="text-gray-5">{memberData.name}</div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="text-gray-5 font-bold mb-2">전화번호</div>
              <div className="text-gray-5">{memberData.phoneNumber}</div>
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
            <LogoutButton token={token} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
