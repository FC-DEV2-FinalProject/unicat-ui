export default function LoginPage() {
  return (
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
          <form className="w-full group">
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
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h2 className="mb-1">비밀번호</h2>
                    <sup className="text-red-500 text-sm">*</sup>
                  </div>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md mb-1 p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    required
                  />
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    type="password"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h2 className="mb-1">이름</h2>
                    <sup className="text-red-500 text-sm">*</sup>
                  </div>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="이름을 입력해주세요."
                    type="text"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h2 className="mb-1">전화번호</h2>
                    <sup className="text-red-500 text-sm">*</sup>
                  </div>
                  <input
                    className="w-full border-2 border-gray-100 rounded-md p-2.5 placeholder:text-sm placeholder:text-gray-300 focus:border-[#7879F1] focus:outline-none"
                    placeholder="-를 제외하고 입력해주세요."
                    type="number"
                    required
                  />
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
        <div
          className="absolute inset-0 z-50 hidden"
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
              <button className="w-full h-[52px] bg-[#7879F1] text-white rounded-lg mt-4">
                로그인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
