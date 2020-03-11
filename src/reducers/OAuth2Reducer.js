import {USER_LOADING, OAUT2_LOADED, OAUT2_ERROR, LOGOUT_SUCCES} from '../actions/types'

export const initialState = {
    token: localStorage.getItem('token'),
    sceibaId: localStorage.getItem('sceibaId'),
    oauth2IsAuthenticated: false,
    isLoading: false,
    oauth2Users: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case OAUT2_LOADED:
            return {
                ...state,
                oauth2IsAuthenticated: true,
                isLoading: false,
                oauth2Users: action.payload
            };
        case OAUT2_ERROR:
            return {
                ...state,
                oauth2Users: null,
                oauth2IsAuthenticated: false,
                isLoading: false
            };
        case LOGOUT_SUCCES:
            localStorage.clear();
            return {
                ...state,
                oauth2Users: null,
                oauth2IsAuthenticated: false,
                isLoading: false
            };
        default:
            return state
    }
}