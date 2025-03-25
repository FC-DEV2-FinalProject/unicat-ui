import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArtStyleState, NewsMakingState } from '@/src/types/newsMakingTypes'; // ThumbnailCardProps 제거

// 뉴스 만들기 스토어 생성
const useNewsMakingStore = create(persist<NewsMakingState>(
  () => ({ // set 파라미터 제거
    title: '',
    content: '',
    selectedThumbnail: null,
    isCreating: false,
    setTitle: (title) => useNewsMakingStore.setState({ title }),
    setContent: (content) => useNewsMakingStore.setState({ content }),
    setSelectedThumbnail: (thumbnail) => useNewsMakingStore.setState({ selectedThumbnail: thumbnail }),
    clearSelectedThumbnail: () => useNewsMakingStore.setState({ selectedThumbnail: null }),
    startCreating: () => useNewsMakingStore.setState({ isCreating: true }),
    finishCreating: () => useNewsMakingStore.setState({ isCreating: false }),
    clear: () => useNewsMakingStore.setState({ title: '', content: '', selectedThumbnail: null, isCreating: false }),
  }),
  {
    name: 'news-making-storage', // LocalStorage에 저장될 키 이름
  }
));

// 추가적인 스토어 생성 예시
const useArtStyleStore = create(persist<ArtStyleState>(
  (set) => ({
    selectedArtStyleId: 0,
    imageSrc: '',
    altText: '',
    setSelectedArtStyle: (id: number, src: string, alt: string) => 
      set({ selectedArtStyleId: id, imageSrc: src, altText: alt }),
    clearSelectedArtStyle: () => set({ selectedArtStyleId: 0, imageSrc: '', altText: '' }),
  }),
  {
    name: 'art-style-storage',
    storage: {
      getItem: (name) => {
        const str = localStorage.getItem(name);
        return str ? JSON.parse(str) : null;
      },
      setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => localStorage.removeItem(name),
    },
  }
));

export { useNewsMakingStore, useArtStyleStore }; 