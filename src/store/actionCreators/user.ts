import { Dispatch } from 'redux';
import { IUser, UserAction, UserActionTypes } from '../types/user';
import axios from 'axios';
import { getPageCount } from '../../utils/pages';

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS});

            const response = await axios.get<IUser[]>('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');

            dispatch({
                type: UserActionTypes.SET_TOTAL_PAGES,
                payload: getPageCount(response.data.length),
            });

            dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data});
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей',
            });
        }
    };
};

export const deleteUser = (id: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.DELETE_USER_BY_ID, payload: id});
    };
};

// Обычно я пагинацию делал через свойство ответа от запроса: response.headers['x-total-count'],
// но в api оно не приходит, поэтому захардкодил значение
export const setTotalPages = (count: number = 25) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.SET_TOTAL_PAGES, payload: getPageCount(count)});
    };
};
