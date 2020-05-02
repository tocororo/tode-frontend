import {
    GET_NOTIFICATION,
    GET_NOTIFICATION_NUMBER,
    DELETE_NOTIFICATION,
    GET_REQUEST_NUMBER,
    GET_CHAT_NUMBER
} from '../actions/types'
const initialState = {
    notifications: [],
    notificationsNumber: 0,
    requestNumber: 0
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_NOTIFICATION:

            return {
                ...state,
                notifications: action.payload
            };
        case GET_NOTIFICATION_NUMBER:

            return {
                ...state,
                notificationsNumber: action.payload
            };
        case GET_REQUEST_NUMBER:

            return {
                ...state,
                requestNumber: action.payload
            };
        case GET_CHAT_NUMBER:

            return {
                ...state,
                chatNumber: action.payload
            };
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notify => notify._id !== action.payload)
            };
        default:
            return state;
    }
}