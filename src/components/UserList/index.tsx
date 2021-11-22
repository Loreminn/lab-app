import React, { useEffect } from 'react';
import classes from './UserList.module.css';

import UserItem from '../UserItem/index';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader/Loader';
import { useUsers } from '../../hooks/useUsers';
import { SortInterface } from '../UserSort';
import { useActions } from '../../hooks/useActions';

interface UserListProps {
    page: number;
    filter: string;
    sort: SortInterface;
    setPage: (n: number) => void;
}

const titles: string[] = [
    'Имя пользователя',
    'E-mail',
    'Дата регистрации',
    'Рейтинг'
];

const UserList: React.FC<UserListProps> = ({filter, sort, page, setPage}) => {
    const {users, error, loading} = useTypedSelector(state => state.user);
    const sortedAndFiltered = useUsers(users, filter, sort);
    const {setTotalPages} = useActions();

    const indexOfLastUser = page * 5;
    const indexOfFirstUser = indexOfLastUser - 5;
    const currentUsers = sortedAndFiltered?.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        setTotalPages(users.length);
    }, []);

    useEffect(() => {
        if (currentUsers && currentUsers.length === 0 && page !== 1) {
            setPage(page - 1);
        }
    }, [users]);

    if (loading) {
        return (
            <Loader/>
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
