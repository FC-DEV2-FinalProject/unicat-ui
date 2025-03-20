export const groupMoviesByDate = (
    movies: { id: number; image: string; title: string; description: string; date: string }[],
    options?: { maxItemsPerDate?: number; filterDate?: string; sortByDate?: "asc" | "desc" }
) => {
    const grouped: Record<string, typeof movies> = {};

    movies.forEach((movie) => {
        if (options?.filterDate && movie.date !== options.filterDate) return; // ✅ 특정 날짜 필터링

        if (!grouped[movie.date]) {
            grouped[movie.date] = [];
        }

        if (options?.maxItemsPerDate) {
            if (grouped[movie.date].length < options.maxItemsPerDate) {
                grouped[movie.date].push(movie);
            }
        } else {
            grouped[movie.date].push(movie);
        }
    });

    let groupedArray = Object.entries(grouped).map(([date, movies]) => ({ date, movies }));

    // ✅ 날짜 정렬 옵션 추가 (asc: 오름차순, desc: 내림차순)
    if (options?.sortByDate) {
        groupedArray = groupedArray.sort((a, b) =>
            options.sortByDate === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
        );
    }

    return groupedArray;
};
