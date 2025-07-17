# Unicat UI (Next.js)

AI 기반 뉴스 영상 제작 서비스 프론트엔드

---

## 🚀 프로젝트 소개

- AI 기술을 활용해 누구나 쉽게 뉴스 영상을 만들 수 있는 서비스의 프론트엔드입니다.
- Next.js(App Router) 기반, TypeScript, Zustand, Shadcn UI, TailwindCSS 등 최신 스택 적용
- 프로젝트 생성 → 아트스타일 선택 → 썸네일 커스터마이즈 → 본문/컷 추가 → 결과물 생성까지 전체 플로우 구현

---

## 🛠️ 실행 방법

```bash
npm install
npm run dev
# 또는
yarn install
yarn dev
```

- 개발 서버: http://localhost:3000
- 환경변수(API_URL, NEXT_PUBLIC_API_URL 등)로 API 주소 관리

---

## 📁 폴더 구조 (주요)

```
src/
├── app/                  # Next.js App Router 페이지/라우트
│   ├── (home)/           # 메인, 뉴스메이킹, 대시보드 등
│   │   └── news-making/  # 뉴스 제작 플로우(썸네일, create, artStyle 등)
│   ├── (auth)/           # 로그인, 회원가입, 콜백 등 인증 관련
│   └── api/              # BFF API 라우트 (mock/프록시)
├── components/           # UI 컴포넌트 (공통, 뉴스메이킹 등)
│   └── news-making/      # 뉴스메이킹 관련 컴포넌트(card, section, button 등)
├── store/                # Zustand 등 상태관리
├── types/                # 전역 타입 정의
├── utils/                # 공통 유틸리티(apiClient 등)
├── mocks/                # MSW 등 목킹 관련
├── services/             # API 서비스 계층
└── constants/            # 상수/리소스
```

---

## 🧩 주요 기술스택
- Next.js 13+ (App Router)
- TypeScript
- Zustand (상태관리)
- Shadcn UI, TailwindCSS
- Axios (apiClient)
- MSW (Mock Service Worker, 개발/테스트용)

---

## ⚠️ 개발/운영 참고사항
- **메인페이지 인증 체크 임시 비활성화**: `src/app/(home)/page.tsx`에서 인증 체크(useEffect) 주석 처리, TODO 주석으로 복구 위치 명시
- **로그인 실패/로그아웃 시 리다이렉트 주석 처리**: 인증/로그아웃 시 자동 이동 막음 (테스트/목서버 환경 대응)
- **API 주소**: 환경변수로 관리, mock 서버/실서버 전환 용이
- **mock API**: Next.js API Route(`/app/api/`)로도 구현 가능, Vercel 등에서 프론트와 함께 배포 가능

---

## 📄 기타
- 상세 플로우/기능 설명: `PROCESS_FLOW.md` 참고
- MSW/테스트: `MOCK-TEST_USAGE.md` 참고

---

문의/협업: whwjdan@gmail.com
