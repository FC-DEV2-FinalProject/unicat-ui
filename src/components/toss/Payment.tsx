"use client";

import axios from "axios";

interface TossPaymentButtonProps {
  token: string;
}

export default function TossPaymentButton({ token }: TossPaymentButtonProps) {
  const handlePayment = async () => {
    try {
      const response = await axios.get("https://api.unicat.day/toss", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("결제 응답:", response.data);
    } catch (error) {
      console.error("결제 API 호출 중 에러 발생:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-[150px] h-[40px] bg-black rounded-lg text-white hover:bg-purple-2 flex items-center justify-center">
      토스 결제하기
    </button>
  );
}
