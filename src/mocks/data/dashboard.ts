import { DashboardResponse } from "@/src/types/DashboardTypes";

export const mockDashboardData: DashboardResponse = {
  content: [
    {
      id: 1,
      title: "유니캣 영상 제작 소개",
      subtitle: "",
      thumbnailUrl: "/images/news-mock2.png",
      artifactUrl: "/images/news-mock2.png",
      scriptTone: "casual",
      imageStyle: "realistic",
      createdAt: "2025-03-02T00:00:00.000Z",
    },
    {
      id: 2,
      title: "쇼츠에 썸네일 넣는 방법",
      subtitle: "",
      thumbnailUrl: "/images/news-mock3.png",
      artifactUrl: "/images/news-mock3.png",
      scriptTone: "casual",
      imageStyle: "realistic",
      createdAt: "2025-03-02T00:00:00.000Z",

    },
    {
      id: 3,
      title: "악어의 하루",
      subtitle: "",
      thumbnailUrl: "/images/news-mock.png",
      artifactUrl: "/images/news-mock.png",
      scriptTone: "casual",
      imageStyle: "realistic",
      createdAt: "2025-03-02T00:00:00.000Z",
    },
    {
      id: 4,
      title: "해변에서 인생샷 찍는 방법",
      subtitle: "",
      thumbnailUrl: "/images/news-mock4.png",
      artifactUrl: "/images/news-mock4.png",
      scriptTone: "casual",
      imageStyle: "realistic",
      createdAt: "2025-03-02T00:00:00.000Z",
    },
  ],
  totalElements: 4,
  totalPages: 1,
  size: 10,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  pageable: {
    offset: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    unpaged: false,
    pageNumber: 0,
    paged: true,
    pageSize: 10,
  },
  numberOfElements: 4,
  first: true,
  last: true,
  empty: false,
};
