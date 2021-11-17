import React, { useEffect, useState } from 'react';
import './index.css';

import UserFilter from './components/UserFilter';
import UserSort, { SortInterface, SortType } from './components/UserSort';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import { useActions } from './hooks/useActions';

const initialSortState: SortInterface = {
    type: 'date',
    ascending: true,
    descending: false
};

const App: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<SortInterface>(initialSortState);
    const [page, setPage] = useState<number>(1);
    const {setTotalPages} = useActions();

    useEffect(() => {
        setTotalPages();
    }, [])

    const toggleSort = (type: SortType) => {
        if (sort.ascending) {
            setSort({type, ascending: false, descending: true});
        } else {
            setSort({type, ascending: true, descending: false});
        }
    };

    const clickSortDateHandler = () => {
        if (sort.type === 'rating') {
            setSort(initialSortState);
            toggleSort('date');
        } else {
            toggleSort('date');
        }
    };

    const clickSortRatingHandler = () => {
        if (sort.type === 'date') {
            setSort({type: 'rating', ascending: true, descending: false});
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
    }

    return (
        <div className="container">
            <h3 className="title">Список пользователей</h3>
            <UserFilter filterQuery={filter} setFilterQuery={setFilter} clearFilterQuery={clearFilter} />
            <UserSort clickSortDateHandler={clickSortDateHandler} clickSortRatingHandler={clickSortRatingHandler} sortType={sort.type} />
            <UserList query={filter} sort={sort} page={page} />
            <Pagination page={page} changePage={changePage}/>
        </div>
    );
};

export default App;
