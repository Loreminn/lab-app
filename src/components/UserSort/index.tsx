import React from 'react';

import classNames from 'classnames';
import classes from './UserSort.module.css';

interface UserSortProps {
    clickSortDateHandler: () => void;
    clickSortRatingHandler: () => void;
    sortType: SortType;
}

export type SortType = 'registration_date' | 'rating';

export interface SortInterface {
    type: SortType;
    asc: boolean;
    desc: boolean;
}

const UserSort: React.FC<UserSortProps> = ({clickSortDateHandler, clickSortRatingHandler, sortType}) => {

    return (
        <div className={classes.SortContainer}>
            <div style={{display: 'flex'}}>
                Сортировка:
                <div
                    className={classNames(classes.SortItem, {'sort-item-active': sortType === 'registration_date'})}
                    onClick={clickSortDateHandler}
                >
                    Дата регистрации
                </div>
                <div
                    className={classNames(classes.SortItem, {'sort-item-active': sortType === 'rating'})}
                    onClick={clickSortRatingHandler}
                >Рейтинг
                </div>
            </div>
        </div>
    );
};

export default UserSort;
