import { GET_DOCUMENT_VERSION, ADD_DOCUMENT_VERSION,
        GET_DOCUMENT_VERSION_ByID, GET_DOCUMENT_VERSION_CONTENT } from '../actions/types'
const initialState = {
    docs_version: [],
    document_version_content: "",
    version: ''
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_DOCUMENT_VERSION:
            return {
                ...state,
                docs_version: action.payload
            };
        case GET_DOCUMENT_VERSION_ByID:
        return {
            ...state,
            version: action.payload
        };
        case GET_DOCUMENT_VERSION_CONTENT:
        return {
            ...state,
            document_version_content: action.payload
        };
        case ADD_DOCUMENT_VERSION:
            return {
                ...state,
                docs_version: [action.payload, ...state.docs_version]
            };
        default:
            return state;
    }
}

