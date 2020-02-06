import {  GET_DOCUMENTS, GET_DOCUMENT,ADD_DOCUMENT, DELETE_DOCUMENT, CREATE_TEXT } from '../actions/types'
const initialState = {
    docs: [],
    perms:[],
    doc: "",
    text:""
}

export default function (state = initialState, action) {
    switch (action.type) {
       
        case GET_DOCUMENTS:
                
            return {
                ...state,
                docs: action.payload.docs,
                perms: action.payload.perms
            };
        case GET_DOCUMENT:
            
            return {
                ...state,
                doc: action.payload
            };
        case ADD_DOCUMENT:
            return {
             ...state,
             docs: [action.payload, ...state.docs]
            };
        case CREATE_TEXT:
            return {
             ...state,
             text: [action.payload, ...state.text],
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

