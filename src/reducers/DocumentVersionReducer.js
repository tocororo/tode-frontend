import { GET_DOCUMENT_VERSION, ADD_DOCUMENT_VERSION,
        GET_DOCUMENT_VERSION_ByID, GET_DOCUMENT_VERSION_CONTENT, createVersionFile } from '../actions/types'
const initialState = {
    docs_version:[],
    last:[],
    lastShared:[],
    document_version_content: "",
    version: {}
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_DOCUMENT_VERSION:
            return {
                ...state,
                docs_version: action.payload.docs_version,
                last: action.payload.last,
                lastShared: action.payload.lastShared
            };
        case GET_DOCUMENT_VERSION_ByID:
        return {
            ...state,
            version: action.payload
        };
        case createVersionFile:
            return {
             ...state,
             text: [action.payload, ...state.text],
            };
        case GET_DOCUMENT_VERSION_CONTENT:
        return {
            ...state,
            document_version_content: action.payload
        };
        case ADD_DOCUMENT_VERSION:
            return {
                ...state,
                docs_version: action.payload
            };
        default:
            return state;
    }
}

