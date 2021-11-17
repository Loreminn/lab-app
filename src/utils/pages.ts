export const getPageCount = (totalCount: number, limit: number = 5): number => {
    return Math.ceil(totalCount / limit);
}
