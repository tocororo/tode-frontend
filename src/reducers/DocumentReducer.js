import {  GET_DOCUMENT, ADD_DOCUMENT } from '../actions/types'
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
        default:
            return state;
    }
}

