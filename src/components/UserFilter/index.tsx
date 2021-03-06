import React, { useEffect } from 'react';
import classes from './UserFilter.module.css';

import filterIcon from '../../assets/pngwing.com.png';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface UserFilterProps {
    filterQuery: string;
    setFilterQuery: (query: string) => void;
    clearFilterQuery: () => void;
    setPage: (n: number) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({filterQuery, setFilterQuery, clearFilterQuery, setPage}) => {
    const {setTotalPages} = useActions();
    const {users} = useTypedSelector(state => state.user);

    useEffect(() => {
        if (!filterQuery) {
            setTotalPages(users.length);
        }
    }, [filterQuery]);

    const changeInputHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(e.target.value)
        setPage(1);
    }


    return (
        <div className={classes.FilterContainer}>
            <div>
                <input
                    className={classes.FilterInput}
                    type="text"
                    placeholder="Поиск по имени или e-mail"
                    value={filterQuery}
                    onChange={changeInputHandler}
                />
            </div>
            <div>
                <div style={{cursor: 'pointer'}} onClick={clearFilterQuery}>
                    <img className={classes.FilterIcon} src={filterIcon} alt="icon"/>
                    <span>Очистить фильтр</span>
                </div>
            </div>
        </div>
    );
};

export default UserFilter;
