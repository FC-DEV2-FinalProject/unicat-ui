"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/src/utils/apiClient";
import {
  SignUpForm,
  FormErrors,
  SuccessModalProps,
  ApiError,
} from "@/src/types/signUpTypes";

function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] bg-white rounded-lg p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#7879F1] rounded-full flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.6667 8L11.3333 23.3333L5.33333 17.3333"
                stroke="white"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">회원가입이 완료되었습니다</h2>
          <p className="text-gray-600 text-center">
            로그인하여 서비스를 이용해보세요
          </p>
          <button
            className="w-full h-[52px] bg-[#7879F1] text-white rounded-lg mt-4"
            onClick={onClose}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      isValid = false;
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "비밀번호는 8자 이상, 16자 이하여야 합니다.";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 한번 더 입력해주세요.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요.";
      isValid = false;
    }

    // 전화번호 검증
    if (!formData.phone) {
      newErrors.phone = "전화번호를 입력해주세요.";
      isValid = false;
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력값이 변경될 때 해당 필드의 에러 메시지 초기화
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // 비밀번호 관련 필드의 경우, 두 필드 모두 초기화
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
        confirmPassword: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 에러 초기화
    setErrors({});

    // 유효성 검사 실행
    const isValid = validateForm();

    // 유효성 검사 실패 시 첫 번째 에러가 있는 필드로 스크롤
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        if (element) {
          element.focus();
        }
      }
      return;
    }

    try {
      // 전화번호 형식 변환 (하이픈 제거)
      const formattedPhone = formData.phone.replace(/-/g, "");

      const requestData = {
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: formData.name.trim(),
        phoneNumber: formattedPhone,
      };

      const response = await apiClient.post("/auth/sign-up", requestData);

      if (response.status === 201) {
        // 성공 시 모달 표시
        setIsSuccessModalOpen(true);
        // 모달이 닫힐 때 로그인 페이지로 이동
        setTimeout(() => {
          router.push("/login?success=true");
        }, 2000);
      }
    } catch (error: unknown) {
      const axiosError = error as ApiError;

      // 서버에서 전달하는 에러 메시지가 있으면 사용
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.errors?.[0]?.defaultMessage ||
        "회원가입에 실패했습니다. 다시 시도해주세요.";

      // 필드별 에러 메시지 설정
      const fieldErrors: FormErrors = {};
      if (axiosError.response?.data?.errors) {
        axiosError.response.data.errors.forEach((error) => {
          // API 스펙의 필드명과 프론트엔드 필드명 매핑
          const fieldMapping: Record<string, keyof FormErrors> = {
            email: "email",
            password: "password",
            confirmPassword: "confirmPassword",
            name: "name",
            phoneNumber: "phone",
          };

          const frontendField = fieldMapping[error.field];
          if (frontendField) {
            fieldErrors[frontendField] = error.defaultMessage;
          }
        });
      } else {
        fieldErrors.email = errorMessage;
      }

      setErrors(fieldErrors);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[60%] h-screen overflow-hidden relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.2), transparent), url("/images/login-background.png")',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-start px-16 pt-16 text-white">
            <h2 className="text-4xl font-bold mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
              AI를 활용해 쉽게 만드는 뉴스
            </h2>
            <h3 className="w-[50%] text-md break-keep [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
              뉴스 만들기를 눌러서 나의 기사를 바탕으로 뉴스를 만들어 유튜브까지
              한번에 공유할 수 있습니다 :)
            </h3>
          </div>
        </div>
        <div className="w-[40%] h-screen relative">
          <div className="w-[350px] flex flex-col items-center justify-center h-full mx-auto">
            <form className="w-full group" onSubmit={handleSubmit} noValidate>
              <div className="w-full flex flex-col justify-center h-full">
                <h1 className="mb-[36px] text-3xl font-bold self-start">
                  회원가입
                </h1>
                <div className="flex flex-col gap-4 mb-1">
                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="mb-1">이메일</h2>
                      <sup className="text-red-500 text-sm">*</sup>
                    </div>
                    <input
                      className={`w-full border-2 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-100"
                      }`}
                      placeholder="이메일을 입력해주세요."
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="mb-1">비밀번호</h2>
                      <sup className="text-red-500 text-sm">*</sup>
                    </div>
                    <input
                      className={`w-full border-2 rounded-md mb-1 p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
                        errors.password ? "border-red-500" : "border-gray-100"
                      }`}
                      placeholder="비밀번호를 입력해주세요."
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                    <input
                      className={`w-full border-2 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-100"
                      }`}
                      placeholder="비밀번호를 한번 더 입력해주세요."
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="mb-1">이름</h2>
                      <sup className="text-red-500 text-sm">*</sup>
                    </div>
                    <input
                      className={`w-full border-2 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
                        errors.name ? "border-red-500" : "border-gray-100"
                      }`}
                      placeholder="이름을 입력해주세요."
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="mb-1">전화번호</h2>
                      <sup className="text-red-500 text-sm">*</sup>
                    </div>
                    <input
                      className={`w-full border-2 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
                        errors.phone ? "border-red-500" : "border-gray-100"
                      }`}
                      placeholder="-를 제외하고 입력해주세요."
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <button
                  type="submit"
                  className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#C7C7C7] text-white group-valid:bg-[#7879F1]"
                >
                  회원가입
                </button>
              </div>
            </form>
          </div>
          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => {
              setIsSuccessModalOpen(false);
              router.push("/login?success=true");
            }}
          />
        </div>
      </div>
    </>
  );
}
