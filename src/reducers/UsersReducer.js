import { GET_USERS, ADD_USER, DELETE_USER, ITEMS_LOADING, GET_USERS_TOPERMISONS } from '../actions/types'
const initialState = {
    users: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}