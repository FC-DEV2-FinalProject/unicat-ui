import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PROJECT_STAGES, type ProjectStage } from '@/src/types/newsMakingTypes';

interface Project {
    id: number;
    createdAt: string;
    selectedArtStyleId?: number;
    stage: ProjectStage;
    thumbnail?: {
        imageSrc?: string;
        title?: string;
        textAlign?: "left" | "center" | "right";
        fontColor?: string;
        fontSize?: number;
        fontFamily?: string;
        selectedCardId?: number;
    };
}

interface ProjectStore {
    projects: Project[];
    currentProjectId: number | null;
    addProject: (project: Pick<Project, 'id' | 'createdAt' | 'stage'>) => void;
    setCurrentProject: (id: number) => void;
    updateProjectArtStyle: (projectId: number, artStyleId: number) => void;
    updateProjectStage: (projectId: number, stage: ProjectStage) => void;
    updateThumbnailImage: (imageSrc: string) => void;
    updateSelectedThumbnail: (
        cardId: number,
        title: string,
        textAlign: "left" | "center" | "right",
        fontColor: string,
        fontSize: number,
        fontFamily: string,
        dataUrl: string
    ) => void;
}

export const useProjectStore = create<ProjectStore>()(
    persist(
        (set) => ({
            projects: [],
            currentProjectId: null,
            addProject: (project) =>
                set((state) => ({
                    projects: [...state.projects, { ...project }],
                    currentProjectId: project.id,
                })),
            setCurrentProject: (id) =>
                set(() => ({
                    currentProjectId: id,
                })),
            updateProjectArtStyle: (projectId, artStyleId) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === projectId
                            ? {
                                ...project,
                                selectedArtStyleId: artStyleId,
                                stage: artStyleId ? PROJECT_STAGES.THUMBNAIL : PROJECT_STAGES.ART_STYLE,
                            }
                            : project
                    ),
                })),
            updateProjectStage: (projectId, stage) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === projectId
                            ? { ...project, stage }
                            : project
                    ),
                })),
            updateThumbnailImage: (imageSrc) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === state.currentProjectId
                            ? {
                                ...project,
                                thumbnail: {
                                    ...project.thumbnail,
                                    imageSrc,
                                },
                            }
                            : project
                    ),
                })),
            updateSelectedThumbnail: (
                cardId: number,
                title: string,
                textAlign: "left" | "center" | "right",
                fontColor: string,
                fontSize: number,
                fontFamily: string,
                dataUrl: string
            ) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === state.currentProjectId
                            ? {
                                ...project,
                                thumbnail: {
                                    ...project.thumbnail,
                                    selectedCardId: cardId,
                                    title,
                                    textAlign,
                                    fontColor,
                                    fontSize,
                                    fontFamily,
                                    imageSrc: dataUrl,
                                },
                            }
                            : project
                    ),
                })),
        }),
        {
            name: 'project-storage',
        }
    )
);
