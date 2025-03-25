import apiClient from '@/src/utils/apiClient';

/**
 * 프로젝트 생성 요청에 필요한 데이터 구조
 * @property {string} title - 프로젝트 제목
 * @property {string} subtitle - 프로젝트 부제목
 * @property {string} scriptTone - 스크립트 톤
 * @property {string} imageStyle - 이미지 스타일
 */
export interface CreateProjectRequest {
    title: string;
    subtitle: string;
    scriptTone: string;
    imageStyle: string;
}

/**
 * 프로젝트 정보를 나타내는 인터페이스
 * @property {number} id - 프로젝트 고유 ID (BigInt)
 * @property {string} title - 프로젝트 제목
 * @property {string} subtitle - 프로젝트 부제목
 * @property {string} thumbnailUrl - 썸네일 이미지 URL
 * @property {string} artifactUrl - 아티팩트 URL
 * @property {string} scriptTone - 스크립트 톤
 * @property {string} imageStyle - 이미지 스타일
 * @property {string} createdAt - 프로젝트 생성 시간 (ISO 8601)
 */
export interface Project {
    id: number;
    title: string;
    subtitle: string;
    thumbnailUrl: string;
    artifactUrl: string;
    scriptTone: string;
    imageStyle: string;
    createdAt: string;
}

/**
 * 프로젝트 관련 API 호출을 담당하는 서비스 객체
 * 외부 API와의 통신을 추상화하고 비즈니스 로직을 캡슐화합니다.
 */
export const projectService = {
    /**
     * 새로운 프로젝트를 생성합니다.
     * @param {CreateProjectRequest} data - 생성할 프로젝트의 데이터
     * @returns {Promise<Project>} 생성된 프로젝트 정보
     * @throws {Error} API 호출 실패 시 에러 발생
     */
    createProject: async (data: CreateProjectRequest): Promise<Project> => {
        const response = await apiClient.post<Project>('/projects', data);
        return response.data;
    },

    /**
     * 모든 프로젝트 목록을 조회합니다.
     * @returns {Promise<Project[]>} 프로젝트 목록
     * @throws {Error} API 호출 실패 시 에러 발생
     */
    getProjects: async (): Promise<Project[]> => {
        const response = await apiClient.get<Project[]>('/projects');
        return response.data;
    }
}; 