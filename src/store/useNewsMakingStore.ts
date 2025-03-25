import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsMakingState, ThumbnailCardProps } from '@/src/types/newsMakingTypes'; // 필요한 타입 가져오기

// 뉴스 만들기 스토어 생성
const useNewsMakingStore = create(persist<NewsMakingState>(
  (set) => ({
    title: '',
    content: '',
    selectedThumbnail: null,
    isCreating: false,
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setSelectedThumbnail: (thumbnail) => set({ selectedThumbnail: thumbnail }),
    clearSelectedThumbnail: () => set({ selectedThumbnail: null }),
    startCreating: () => set({ isCreating: true }),
    finishCreating: () => set({ isCreating: false }),
    clear: () => set({ title: '', content: '', selectedThumbnail: null, isCreating: false }),
  }),
  {
    name: 'news-making-storage', // LocalStorage에 저장될 키 이름
  }
));

// 추가적인 스토어 생성 예시


export { useNewsMakingStore }; 