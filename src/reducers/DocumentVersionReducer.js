import { GET_DOCUMENT_VERSION, ADD_DOCUMENT_VERSION } from '../actions/types'
const initialState = {
    docs_version: []
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_DOCUMENT_VERSION:
            return {
                ...state,
                docs_version: action.payload
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

