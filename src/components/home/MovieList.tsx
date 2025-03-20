import React from "react";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
    movies: { id: number; image: string; title: string; description: string; date: string }[];
    className?: string;
}

export const MovieList = ({ movies, className }: MovieListProps) => {
    // ✅ 시간 기준 내림차순 정렬
    const sortedMovies = [...movies].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className={`space-y-6 ${className || ""}`}>
            {/* ✅ 리스트의 날짜 표시 (첫 번째 요소 기준) */}
            {movies.length > 0 && (
                <div className="text-lg font-bold text-gray-700">{movies[0].date}</div>
            )}

            {/* ✅ 개별 MovieCard 렌더링 (시간순 내림차순 정렬) */}
            <div className="grid grid-cols-3 gap-6">
                {sortedMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        image={movie.image || "/images/default-thumbnail.png"}
                        title={movie.title || "제목 없음"}
                        description={movie.description || "설명 없음"}
                    />
                ))}
            </div>
        </div>
    );
};
