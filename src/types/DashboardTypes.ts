export interface DashboardItem {
  id: number;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  artifactUrl: string;
  scriptTone: string;
  imageStyle: string;
  createdAt: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  pageNumber: number;
  paged: boolean;
  pageSize: number;
}

export interface DashboardResponse {
  content: DashboardItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
