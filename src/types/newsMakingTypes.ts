// Art style interface
export interface ArtStyle {
  id: number;
  imageSrc: string;
  alt: string;
}

// 기본 width, height 268 300 이전 Props로 속성 전달시 변경됨
export interface ArtStyleCardProps {
  artStyleId?: number;  // Added artStyleId as optional prop
  imageSrc: string;
  altText: string;
  onClick?: () => void;
  isSelected: boolean;
  applyBorderBox?: boolean; // ✅ 특정 컴포넌트에서만 적용할 수 있는 새로운 prop
  width?: number;
  height?: number;
  className?: string;
}

// Art style state interface - ArtStyleCardProps를 extends하고 onClick을 제외
export interface ArtStyleState extends Omit<ArtStyleCardProps, 'onClick'> {
  selectedArtStyleId: number;  // 선택된 아트스타일 ID 추가
  setSelectedArtStyle: (id: number, src: string, alt: string) => void;
  clearSelectedArtStyle: () => void;
}

/**
 * Props for the ThumbnailCard component.
*/
export interface ThumbnailCardProps {
  /** The ID of the art style associated with the thumbnail. */
  artStyleId: number;
  /** The ID of the thumbnail. */
  thumbnailId: number;
  /** The title to display on the thumbnail. */
  title: string;
  /** The source URL of the thumbnail image. */
  imageSrc?: string;
  /** The alt text for the thumbnail image. */
  altText: string;
  /** Optional click handler for the thumbnail. */
  onClick?: () => void;
  /** Indicates whether the thumbnail is selected. */
  isSelected?: boolean;
  /** Text alignment for the thumbnail title */
  textAlign: "left" | "center" | "right";
  /** Font color for the thumbnail title */
  fontColor: string;
  /** Font size for the thumbnail title */
  fontSize: number;
  /** Font family for the thumbnail title */
  fontFamily: "Arial" | "Times New Roman" | "Courier New" | "Verdana";
}


// 뉴스 만들기 프로세스 상태 인터페이스
export interface NewsMakingState {
  title: string;
  content: string;
  selectedThumbnail: string | null;
  isCreating: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSelectedThumbnail: (thumbnail: string) => void;
  clearSelectedThumbnail: () => void;
  startCreating: () => void;
  finishCreating: () => void;
  clear: () => void;
}

// 추가적인 타입 정의
/*
export interface AnotherType {
  // 필요한 속성 정의
}
*/

// Dummy movie 타입 정의
export interface DummyMovie {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
}

export interface ThumbnailProjectCard {
    id: number;
    artStyleId: number;
    thumbnailId: number;
    imageSrc: string;
    altText: string;
    textAlign: "left" | "center" | "right";
    fontColor: string;
    fontSize: number;
    fontFamily: "Arial" | "Times New Roman" | "Courier New" | "Verdana";
}

// Project store interface
/**
 * 프로젝트 정보를 담는 인터페이스
 * @property id - 프로젝트 고유 ID
 * @property createdAt - 프로젝트 생성 시간
 * @property selectedArtStyleId - 선택된 아트스타일 ID (선택되지 않은 경우 undefined)
 */
export interface Project {
  id: number;
  createdAt: string;
  selectedArtStyleId?: number;
}

/**
 * 프로젝트 스토어의 영구 저장 상태
 * @property projects - 생성된 모든 프로젝트 목록
 * @property currentProjectId - 현재 작업 중인 프로젝트 ID (없는 경우 null)
 */
export interface PersistedProjectState {
  projects: Project[];
  currentProjectId: number | null;
}

/**
 * 프로젝트 스토어의 전체 상태 및 메서드
 * @property projects - 생성된 모든 프로젝트 목록
 * @property currentProjectId - 현재 작업 중인 프로젝트 ID
 * @property addProject - 새로운 프로젝트 추가
 * @property setCurrentProject - 현재 작업 중인 프로젝트 설정
 * @property clearCurrentProject - 현재 프로젝트 초기화
 * @property updateProjectArtStyle - 프로젝트의 아트스타일 업데이트
 */
export interface ProjectState extends PersistedProjectState {
  addProject: (project: Project) => void;
  setCurrentProject: (id: number) => void;
  clearCurrentProject: () => void;
  updateProjectArtStyle: (projectId: number, artStyleId: number) => void;
}

