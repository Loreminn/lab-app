import React, { useEffect } from 'react';
import classes from './UserList.module.css';

import UserItem from '../UserItem/index';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader/Loader';
import { useUsers } from '../../hooks/useUsers';
import { SortInterface } from '../UserSort';

interface UserListProps {
    page: number;
    filter: string;
    sort: SortInterface;
}

const titles: string[] = [
    'Имя пользователя',
    'E-mail',
    'Дата регистрации',
    'Рейтинг'
];

const UserList: React.FC<UserListProps> = ({page, filter, sort}) => {
    const {users, error, loading} = useTypedSelector(state => state.user);
    const sortedAndFiltered = useUsers(users, filter, sort);

    const indexOfLastUser = page * 5;
    const indexOfFirstUser = indexOfLastUser - 5;
    const currentUsers = sortedAndFiltered?.slice(indexOfFirstUser, indexOfLastUser);

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
            {currentUsers && currentUsers.map((user: any) => (
                <UserItem key={user.id} {...user} />
            ))}
        </div>
    );
};

export default UserList;
