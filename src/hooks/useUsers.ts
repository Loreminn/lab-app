import { IUser } from '../store/types/user';
import { useMemo } from 'react';
import { SortInterface } from '../components/UserSort';

export const useSortedUsers = (users: IUser[], sort: SortInterface) => {
    return useMemo(() => {
        switch (sort.type) {
            case 'date':
                if (sort.ascending) {
                    return users.sort((a, b) => {
                        const first = new Date(a.registration_date);
                        const second = new Date(b.registration_date);
                        return first.getTime() - second.getTime();
                    });
                } else if (sort.descending) {
                    return users.sort((a, b) => {
                        const first = new Date(a.registration_date);
                        const second = new Date(b.registration_date);
                        return second.getTime() - first.getTime();
                    });
                }
                break;
            case 'rating':
                if (sort.ascending) {
                    return users.sort((a, b) => a.rating - b.rating);
                } else if (sort.descending) {
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
    return useMemo(() => {
        if (!query) {
            return sortedUsers;
        }
        return sortedUsers?.filter(
            user => user.username.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, users]);
};
