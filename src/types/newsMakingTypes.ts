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
  imageSrc: string;
  /** The alt text for the thumbnail image. */
  altText: string;
  /** Text alignment for the thumbnail title */
  textAlign: "left" | "center" | "right";
  /** Font color for the thumbnail title */
  fontColor: string;
  /** Font size for the thumbnail title */
  fontSize: number;
  /** Font family for the thumbnail title */
  fontFamily: "Arial" | "Times New Roman" | "Courier New" | "Verdana";
  /** Indicates whether the thumbnail is selected. */
  isSelected?: boolean;
  /** Optional click handler for the thumbnail. */
  onClick?: () => void;
  className?: string;
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

// Project stage type
export const PROJECT_STAGES = {
  ART_STYLE: 'art_style',
  THUMBNAIL: 'thumbnail',
  CREATING: 'creating',
  COMPLETED: 'completed'
} as const;

export type ProjectStage = typeof PROJECT_STAGES[keyof typeof PROJECT_STAGES];

// Project store interface
/**
 * 프로젝트 정보를 담는 인터페이스
 * @property id - 프로젝트 고유 ID
 * @property createdAt - 프로젝트 생성 시간
 * @property selectedArtStyleId - 선택된 아트스타일 ID (선택되지 않은 경우 undefined)
 * @property stage - 프로젝트 진행 단계
 */
export interface Project {
  id: number;
  createdAt: string;
  selectedArtStyleId?: number;
  stage: ProjectStage;
  // 썸네일 관련 필드 추가
  thumbnail?: {
    title: string;
    imageSrc: string;
    textAlign: "left" | "center" | "right";
    fontColor: string;
    fontSize: number;
    fontFamily: "Arial" | "Times New Roman" | "Courier New" | "Verdana";
  };
}