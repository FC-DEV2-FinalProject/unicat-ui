import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArtStyleState, NewsMakingState, ThumbnailProjectCard, ProjectState } from '@/src/types/newsMakingTypes';

// Project store
const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      projects: [],
      currentProjectId: null,
      addProject: (project) => {
        console.log('ProjectStore - addProject:', project);
        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id
        }));
      },
      setCurrentProject: (id) => {
        console.log('ProjectStore - setCurrentProject:', id);
        set({ currentProjectId: id });
      },
      clearCurrentProject: () => {
        console.log('ProjectStore - clearCurrentProject');
        set({ currentProjectId: null });
      },
      updateProjectArtStyle: (projectId, artStyleId) => {
        console.log('ProjectStore - updateProjectArtStyle:', { projectId, artStyleId });
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { ...project, selectedArtStyleId: artStyleId }
              : project
          )
        }));
      },
    }),
    {
      name: 'project-storage',
      partialize: ((state) => ({
        projects: state.projects,
        currentProjectId: state.currentProjectId,
      })) as (state: ProjectState) => ProjectState,
    }
  )
);

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
    isSelected: false,
    setSelectedArtStyle: (id: number, src: string, alt: string) => {
      console.log('ArtStyleStore - setSelectedArtStyle:', { id, src, alt });
      set({ selectedArtStyleId: id, imageSrc: src, altText: alt, isSelected: true });
    },
    clearSelectedArtStyle: () => {
      console.log('ArtStyleStore - clearSelectedArtStyle');
      set({ selectedArtStyleId: 0, imageSrc: '', altText: '', isSelected: false });
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

export { useNewsMakingStore, useArtStyleStore, useThumbnailProjectCardStore, useProjectStore };