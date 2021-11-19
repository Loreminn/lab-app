import { UserAction, UserActionTypes, UserState } from '../types/user';

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    totalPages: 0,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return {loading: true, users: [], error: null, totalPages: 0};
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: null,
                totalPages: state.totalPages
            };
        case UserActionTypes.FETCH_USERS_ERROR:
            return {loading: false, users: [], error: action.payload, totalPages: 0};
        case UserActionTypes.SET_TOTAL_PAGES:
            return {loading: false, users: state.users, error: null, totalPages: action.payload};
        case UserActionTypes.DELETE_USER_BY_ID:
            return {
                loading: false,
                users: state.users.filter(user => Number(user.id) !== Number(action.payload)),
                error: null,
                totalPages: state.totalPages
            };
        default:
            return state;
    }
};
