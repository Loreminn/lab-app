import { useMemo } from 'react';

export const usePagination = (totalPages: number) => {
    let pagesArray: number[] = [];
    return useMemo(() => {
        for (let i = 0; i < totalPages; i++) {
            pagesArray.push(i + 1);
        }
        return pagesArray;
    }, [totalPages]);
};
