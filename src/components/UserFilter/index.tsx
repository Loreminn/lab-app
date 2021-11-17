import React  from 'react';
import classes from './UserFilter.module.css';

import filterIcon from '../../assets/pngwing.com.png';

interface UserFilterProps {
    filterQuery: string;
    setFilterQuery: (query: string) => void;
    clearFilterQuery: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({filterQuery, setFilterQuery, clearFilterQuery}) => {
    return (
        <div className={classes.FilterContainer}>
            <div>
                <input
                    className={classes.FilterInput}
                    type="text"
                    placeholder="Поиск по имени или e-mail"
                    value={filterQuery}
                    onChange={e => setFilterQuery(e.target.value)}
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
