import React, { useEffect } from 'react';
import classes from './UserList.module.css';

import UserItem from '../UserItem/index';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useUsers } from '../../hooks/useUsers';
import { SortInterface } from '../UserSort';
import Loader from '../Loader/Loader';

interface UserListProps {
    query: string;
    sort: SortInterface;
    page: number;
}

const titles: string[] = [
    'Имя пользователя',
    'E-mail',
    'Дата регистрации',
    'Рейтинг'
];

const UserList: React.FC<UserListProps> = ({query, sort, page}) => {
    const {users, loading, error} = useTypedSelector(state => state.user);
    const {fetchUsers} = useActions();
    const sortedAndFilteredUsers = useUsers(users, query, sort);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return <h1 style={{color: 'red'}}>{error}</h1>;
    }

    return (
        <div className={classes.UserListContainer}>
            <div className={classes.UserListTitles}>
                {titles.map(title => (
                    <div key={title} className={classes.UserListTitle}>{title}</div>
                ))}
            </div>
            {sortedAndFilteredUsers && sortedAndFilteredUsers.map(user => (
                <UserItem key={user.id} {...user} />
            ))}
        </div>
    );
};

export default UserList;
