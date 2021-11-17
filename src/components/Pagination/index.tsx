import React from 'react';
import classes from './Pagination.module.css';
import { usePagination } from '../../hooks/usePagination';
import classNames from 'classnames';

interface PaginationProps {
    page: number;
    changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({page, changePage}) => {
    const pagesArray = usePagination(5);

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
