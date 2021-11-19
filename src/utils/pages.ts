export const getPageCount = (totalCount: number = 25, limit: number = 5): number => {
    return Math.ceil(totalCount / limit);
};
