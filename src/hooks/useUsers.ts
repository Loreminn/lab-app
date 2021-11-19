import { IUser } from '../store/types/user';
import { useMemo } from 'react';
import { SortInterface } from '../components/UserSort';
import { useActions } from './useActions';

export const useSortedUsers = (users: IUser[], sort: SortInterface) => {
    return useMemo(() => {
        switch (sort.type) {
            case 'registration_date':
                if (sort.asc) {
                    return users.sort((a, b) => {
                        const first = new Date(a.registration_date);
                        const second = new Date(b.registration_date);
                        return first.getTime() - second.getTime();
                    });
                } else if (sort.desc) {
                    return users.sort((a, b) => {
                        const first = new Date(a.registration_date);
                        const second = new Date(b.registration_date);
                        return second.getTime() - first.getTime();
                    });
                }
                break;
            case 'rating':
                if (sort.asc) {
                    return users.sort((a, b) => a.rating - b.rating);
                } else if (sort.desc) {
                    return users.sort((a, b) => b.rating - a.rating);
                }
                break;
            default:
                return users;

        }
    }, [sort, users]);
};

export const useUsers = (users: IUser[], query: string, sort: SortInterface) => {
    const sortedUsers = useSortedUsers(users, sort);
    const {setTotalPages} = useActions();
    return useMemo(() => {
        if (!query) {
            return sortedUsers;
        }

        const filteredUsers = sortedUsers?.filter(
            user => user.username.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())
        );
        setTotalPages(filteredUsers?.length);
        return filteredUsers;
    }, [query, users]);
};
