export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60%] h-full overflow-hidden">
        <img
          src="/images/login-background.png"
          alt="로그인 배경 이미지"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[40%]">
        <div className="w-[350px] flex flex-col items-center justify-center h-full mx-auto">
          <form className="w-full group">
            <div className="w-full flex flex-col justify-center h-full mb-[56px]">
              <h1 className="mb-[36px] text-3xl font-bold self-start">
                로그인
              </h1>
              <div className="flex flex-col gap-4 mb-1">
                <div>
                  <h2 className="mb-1">이메일</h2>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    required
                  />
                </div>
                <div>
                  <h2 className="mb-1">비밀번호</h2>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="KeepLogining"
                  type="checkbox"
                  className="w-4 h-4 accent-[#7879F1] cursor-pointer"
                />
                <label htmlFor="KeepLogining" className="text-sm text-gray-600">
                  로그인 유지
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                type="submit"
                className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#C7C7C7] text-white group-valid:bg-[#7879F1]"
              >
                로그인
              </button>
              <button
                type="button"
                className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#FEE500]"
              >
                <img src="/images/KaKao.svg" alt="카카오 로그인 아이콘" />
                카카오 로그인
              </button>
              <button
                type="button"
                className="flex h-[52px] px-6 py-3 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#F2F2F2]"
              >
                <img src="/images/Google.svg" alt="구글 로그인 아이콘" />
                구글 로그인
              </button>
              <a className="text-md font-bold text-[#7879F1]" href="#">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
