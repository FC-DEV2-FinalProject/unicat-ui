# 뉴스 제작 프로세스 흐름

## 1. 메인 페이지
- 뉴스 제작하기 버튼 클릭 시 `handleCreateProject` 함수 실행
- `/projects` POST API 호출
- 응답으로 받은 `projectId`를 파라미터로 전달하여 아트스타일 페이지로 이동

## 2. 아트스타일 페이지
- 아트스타일 이미지 클릭 시
  - Zustand store (`art-style-storage`)에 다음 데이터 저장:
    ```json
    {
      "state": {
        "selectedArtStyleId": 3,
        "imageSrc": "/images/news-making/news-style-3.png",
        "altText": "스타일 3"
      },
      "version": 0
    }
    ```
- 다음으로 버튼 클릭 시 썸네일 페이지로 이동

## 3. 썸네일 페이지
- 제목 입력 시 4개 썸네일 카드에 실시간 반영
- 이미지 업로드/생성하기 버튼 클릭 시 썸네일 모달창 오픈

### 3.1 이미지 업로드 선택 시
1. 사용자 화면에서 이미지 업로드
2. `/projects/sections` POST 요청으로 section ID 발급
3. create 페이지로 이동

### 3.2 AI 생성 선택 시
1. `/projects/sections` POST 요청으로 section ID 발급
2. `POST /projects/{projectId}/sections/{sectionId}` 요청으로 썸네일 이미지 생성
3. create 페이지로 이동

## API 엔드포인트 요약
- `POST /projects` - 프로젝트 생성
- `POST /projects/sections` - 섹션 ID 발급
- `POST /projects/{projectId}/sections/{sectionId}` - 썸네일 이미지 생성 