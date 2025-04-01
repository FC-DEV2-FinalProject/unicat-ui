"use client";

import React, { useState } from "react";
import apiClient from "@/src/utils/apiClient";

interface EditProfileButtonProps {
  initialName: string;
  initialPhoneNumber: string;
  onUpdate: () => void;
}

export default function EditProfileButton({
  initialName,
  initialPhoneNumber,
  onUpdate,
}: EditProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.patch("https://api.unicat.day/members", {
        name,
        phoneNumber,
      });
      setIsOpen(false);
      onUpdate();
      alert("회원 정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      alert("회원 정보 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-[100px] h-[40px] bg-gray-400 rounded-lg text-white hover:bg-gray-700 flex ml-5 items-center justify-center">
        정보수정
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-5 font-medium mb-2">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-5 font-medium mb-2">전화번호</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  pattern="[0-9]{10,11}"
                  placeholder="'-' 없이 숫자만 입력"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  disabled={isSubmitting}>
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
                  disabled={isSubmitting}>
                  {isSubmitting ? "처리 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
