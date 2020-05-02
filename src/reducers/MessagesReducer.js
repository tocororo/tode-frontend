import { GET_MESSAGES, ADD_MESSAGE,GET_CHAT_NUMBER } from '../actions/types'
const initialState = {
    messages: [],
    numberOfMessages: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [action.payload, ...state.messages]
            };
        case GET_CHAT_NUMBER:
            return {
                ...state,
                numberOfMessages: [action.payload, ...state.numberOfMessages]
            };
        default:
            return state;
    }
}