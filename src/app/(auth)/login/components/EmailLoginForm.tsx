"use client";

import { useState } from "react";
import { LoginForm, FormErrors, ApiError } from "@/src/types/loginTypes";
import apiClient from "@/src/utils/apiClient";
import { setCookie } from "cookies-next";

interface EmailLoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoginSuccess: () => void;
}

export default function EmailLoginForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoginSuccess,
}: EmailLoginFormProps) {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [keepLogin, setKeepLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
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

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setErrors({});

    const isValid = validateForm();

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
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/sign-in", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // API 명세서에 따라 200 OK 체크
      if (response.status === 200) {
        const token = response.data.data.token;
        setCookie("Authorization", token, {
          maxAge: keepLogin ? 60 * 60 * 24 * 30 : undefined,
        });
        // 로그인 성공 후 메인 페이지로 리다이렉트
        window.location.href = "/";
      }
    } catch (error: unknown) {
      const axiosError = error as ApiError;
      const status = axiosError.response?.status;

      // 400 Bad Request - Validation 오류
      if (status === 400) {
        const fieldErrors: FormErrors = {};
        if (axiosError.response?.data?.errors) {
          axiosError.response.data.errors.forEach((error) => {
            const fieldMapping: Record<string, keyof FormErrors> = {
              email: "email",
              password: "password",
            };

            const frontendField = fieldMapping[error.field];
            if (frontendField) {
              fieldErrors[frontendField] = error.defaultMessage;
            }
          });
        }
        setErrors(fieldErrors);
      }
      // 401 Unauthorized - 인증 실패
      else if (status === 401) {
        setErrors({
          email: "잘못된 이메일 또는 비밀번호입니다.",
        });
      }
      // 기타 에러
      else {
        setErrors({
          email: "로그인에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full group" onSubmit={handleSubmit} noValidate>
      <div className="w-full flex flex-col justify-center h-full mb-6">
        <h1 className="mb-[36px] text-3xl font-bold self-start">로그인</h1>
        <div className="flex flex-col gap-4 mb-1">
          <div>
            <h2 className="mb-1">이메일</h2>
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
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <h2 className="mb-1">비밀번호</h2>
            <input
              className={`w-full border-2 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none ${
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
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            id="KeepLogining"
            type="checkbox"
            className="w-4 h-4 accent-[#7879F1] cursor-pointer"
            checked={keepLogin}
            onChange={(e) => setKeepLogin(e.target.checked)}
          />
          <label htmlFor="KeepLogining" className="text-sm text-gray-600">
            로그인 유지
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#7879F1] text-white hover:bg-[#5F60E1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </form>
  );
}
