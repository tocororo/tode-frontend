import {  GET_DOCUMENT, ADD_DOCUMENT, DELETE_DOCUMENT } from '../actions/types'
const initialState = {
    docs: []
}

export default function (state = initialState, action) {
    switch (action.type) {
       
        case GET_DOCUMENT:
            return {
                ...state,
                docs: action.payload
            };
        case ADD_DOCUMENT:
            return {
             ...state,
             docs: [action.payload, ...state.docs]
            };
            case DELETE_DOCUMENT:
            return {
                ...state,
                docs: state.users.filter(doc => doc._id !== action.payload)
            };
        default:
            return state;
    }
}

