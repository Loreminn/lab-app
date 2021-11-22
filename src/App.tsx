import React, { useEffect, useState } from 'react';
import './index.css';

import UserFilter from './components/UserFilter';
import UserSort, { SortInterface, SortType } from './components/UserSort';
import Pagination from './components/Pagination';
import { useActions } from './hooks/useActions';
import UserList from './components/UserList';

const initialSortState: SortInterface = {
    type: 'registration_date',
    asc: true,
    desc: false
};

const App: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<SortInterface>(initialSortState);
    const [page, setPage] = useState<number>(1);
    const {fetchUsers} = useActions();

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleSort = (type: SortType) => {
        if (sort.asc) {
            setSort({type, asc: false, desc: true});
        } else {
            setSort({type, asc: true, desc: false});
        }
    };

    const clickSortDateHandler = () => {
        if (sort.type === 'rating') {
            setSort(initialSortState);
            toggleSort('registration_date');
        } else {
            toggleSort('registration_date');
        }
    };

    const clickSortRatingHandler = () => {
        if (sort.type === 'registration_date') {
            setSort({type: 'rating', asc: true, desc: false});
            toggleSort('rating');
        } else {
            toggleSort('rating');
        }
    };

    const clearFilter = () => {
        setFilter('');
        setSort(initialSortState);
    };

    const changePage = (page: number) => {
        setPage(page);
    };

    return (
        <div className="container">
            <h3 className="title">Список пользователей</h3>
            <UserFilter
                filterQuery={filter}
                setFilterQuery={setFilter}
                clearFilterQuery={clearFilter}
            />
            <UserSort
                clickSortDateHandler={clickSortDateHandler}
                clickSortRatingHandler={clickSortRatingHandler}
                sortType={sort.type}
            />
            <UserList
                sort={sort}
                filter={filter}
                page={page}
                setPage={setPage}
            />
            <Pagination
                page={page}
                changePage={changePage}
            />
        </div>
    );
};

export default App;
