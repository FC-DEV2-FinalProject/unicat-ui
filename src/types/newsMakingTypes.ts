// Art style interface
export interface ArtStyle {
  id: number;
  imageSrc: string;
  alt: string;
}

// 기본 width, height 268 300 이전 Props로 속성 전달시 변경됨
export interface ArtStyleCardProps {
  imageSrc: string;
  altText: string;
  onClick?: () => void;
  isSelected: boolean;
  applyBorderBox?: boolean; // ✅ 특정 컴포넌트에서만 적용할 수 있는 새로운 prop
  width?: number;
  height?: number;
  className?: string;
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

export interface ArtStyleState {
  selectedArtStyleId: number;
  imageSrc: string;
  altText: string;
  setSelectedArtStyle: (id: number, src: string, alt: string) => void;
  clearSelectedArtStyle: () => void;
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

