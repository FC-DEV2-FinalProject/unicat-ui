import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArtStyleState, NewsMakingState, ThumbnailProjectCard } from '@/src/types/newsMakingTypes';

// 뉴스 만들기 스토어 생성
const useNewsMakingStore = create(persist<NewsMakingState>(
  () => ({
    title: '',
    content: '',
    selectedThumbnail: null,
    isCreating: false,
    setTitle: (title) => {
      console.log('NewsMakingStore - setTitle:', title);
      useNewsMakingStore.setState({ title });
    },
    setContent: (content) => {
      console.log('NewsMakingStore - setContent:', content);
      useNewsMakingStore.setState({ content });
    },
    setSelectedThumbnail: (thumbnail) => {
      console.log('NewsMakingStore - setSelectedThumbnail:', thumbnail);
      useNewsMakingStore.setState({ selectedThumbnail: thumbnail });
    },
    clearSelectedThumbnail: () => {
      console.log('NewsMakingStore - clearSelectedThumbnail');
      useNewsMakingStore.setState({ selectedThumbnail: null });
    },
    startCreating: () => {
      console.log('NewsMakingStore - startCreating');
      useNewsMakingStore.setState({ isCreating: true });
    },
    finishCreating: () => {
      console.log('NewsMakingStore - finishCreating');
      useNewsMakingStore.setState({ isCreating: false });
    },
    clear: () => {
      console.log('NewsMakingStore - clear');
      useNewsMakingStore.setState({ title: '', content: '', selectedThumbnail: null, isCreating: false });
    },
  }),
  {
    name: 'news-making-storage',
  }
));

// 썸네일 프로젝트 카드 스토어
const useThumbnailProjectCardStore = create(persist<{
    projectCard: ThumbnailProjectCard | null;
    setProjectCard: (card: ThumbnailProjectCard) => void;
    clearProjectCard: () => void;
}>(
  (set) => ({
    projectCard: null,
    setProjectCard: (card) => {
      console.log('ThumbnailProjectCardStore - setProjectCard:', card);
      set({ projectCard: card });
    },
    clearProjectCard: () => {
      console.log('ThumbnailProjectCardStore - clearProjectCard');
      set({ projectCard: null });
    },
  }),
  {
    name: 'thumbnail-project-card-storage',
  }
));

// 추가적인 스토어 생성 예시
const useArtStyleStore = create(persist<ArtStyleState>(
  (set) => ({
    selectedArtStyleId: 0,
    imageSrc: '',
    altText: '',
    setSelectedArtStyle: (id: number, src: string, alt: string) => {
      console.log('ArtStyleStore - setSelectedArtStyle:', { id, src, alt });
      set({ selectedArtStyleId: id, imageSrc: src, altText: alt });
    },
    clearSelectedArtStyle: () => {
      console.log('ArtStyleStore - clearSelectedArtStyle');
      set({ selectedArtStyleId: 0, imageSrc: '', altText: '' });
    },
  }),
  {
    name: 'art-style-storage',
    storage: {
      getItem: (name) => {
        const str = localStorage.getItem(name);
        console.log('ArtStyleStore - getItem:', name, str);
        return str ? JSON.parse(str) : null;
      },
      setItem: (name, value) => {
        console.log('ArtStyleStore - setItem:', name, value);
        localStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => {
        console.log('ArtStyleStore - removeItem:', name);
        localStorage.removeItem(name);
      },
    },
  }
));

export { useNewsMakingStore, useArtStyleStore, useThumbnailProjectCardStore };