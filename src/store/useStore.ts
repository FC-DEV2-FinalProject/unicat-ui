import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

// Art style interface
interface ArtStyle {
  id: number;
  imageSrc: string;
  alt: string;
}

// Thumbnail card props interface
interface ThumbnailCardProps {
  artStyleId: number;
  thumbnailId: number;
  title: string;
  imageSrc?: string;
  altText: string;
  onClick?: () => void;
  isSelected?: boolean;
}

// Store state interface
interface StoreState {
  artStyles: ArtStyle[];
  selectedThumbnail: ThumbnailCardProps | null;
  setArtStyles: (styles: ArtStyle[]) => void;
  setSelectedThumbnail: (thumbnail: ThumbnailCardProps) => void;
  clearSelectedThumbnail: () => void;
}

// Custom storage implementation
const customStorage: PersistStorage<StoreState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return Promise.resolve(item ? JSON.parse(item) : null);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
    return Promise.resolve();
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    return Promise.resolve();
  },
};

// Create the store with persistence
const useStore = create<StoreState>()(
  persist(
    (set) => ({
      artStyles: [
        { id: 1, imageSrc: "/images/news-making/news-style-1.png", alt: "스타일 1" },
        { id: 2, imageSrc: "/images/news-making/news-style-2.png", alt: "스타일 2" },
        { id: 3, imageSrc: "/images/news-making/news-style-3.png", alt: "스타일 3" },
        { id: 4, imageSrc: "/images/news-making/news-style-4.png", alt: "스타일 4" },
      ],
      selectedThumbnail: null,
      setArtStyles: (styles) => set({ artStyles: styles }),
      setSelectedThumbnail: (thumbnail) => set({ selectedThumbnail: thumbnail }),
      clearSelectedThumbnail: () => set({ selectedThumbnail: null }),
    }),
    {
      name: 'art-styles-storage', // LocalStorage에 저장될 키 이름
      storage: customStorage, // Use the custom storage implementation
    }
  )
);

export default useStore; 