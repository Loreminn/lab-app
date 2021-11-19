import React from 'react';
import classes from './Pagination.module.css';
import { usePagination } from '../../hooks/usePagination';
import classNames from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface PaginationProps {
    page: number;
    changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({page, changePage}) => {
    const {totalPages} = useTypedSelector(state => state.user);

    const pagesArray = usePagination(totalPages);

    return (
        <div className={classes.Pagination}>
            {pagesArray.map(p => (
                <a
                    onClick={() => changePage(p)}
                    key={p}
                    className={classNames({'pagination-item-active': page === p})}
                >
                    {p}
                </a>
            ))}
        </div>
    );
};

export default Pagination;
