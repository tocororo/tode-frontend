import {  GET_DOCUMENTS, GET_DOCUMENT,ADD_DOCUMENT, DELETE_DOCUMENT } from '../actions/types'
const initialState = {
    docs: [],
    perms:[],
    doc: "",
    doc_count:""
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
             docs: [action.payload, ...state.docs],
             doc_count: state.doc_count + 1
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

