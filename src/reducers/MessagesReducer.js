import { GET_MESSAGES, ADD_MESSAGE } from '../actions/types'
const initialState = {
    messages: []
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
        default:
            return state;
    }
}