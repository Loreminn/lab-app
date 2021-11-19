export interface IUser {
    id: string;
    username: string;
    email: string;
    registration_date: Date;
    rating: number;
}

export interface UserState {
    users: IUser[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    DELETE_USER_BY_ID = 'DELETE_USER_BY_ID',
    SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USERS;
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: IUser[];
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}

interface DeleteUserById {
    type: UserActionTypes.DELETE_USER_BY_ID;
    payload: string;
}

interface SetTotalPages {
    type: UserActionTypes.SET_TOTAL_PAGES;
    payload: number;
}

export type UserAction =
    FetchUserAction
    | FetchUserErrorAction
    | FetchUserSuccessAction
    | DeleteUserById
    | SetTotalPages;
