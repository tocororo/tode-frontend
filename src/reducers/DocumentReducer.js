import { GET_DOCUMENTS, GET_DOCUMENT } from '../actions/types'
const initialState = {
    docs: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DOCUMENTS:
            return {
                ...state,
                docs: action.payload
            };
        case GET_DOCUMENT:
            return {
                ...state,
                docs: action.payload
            };
        default:
            return state;
    }
}

/*const { docs } = this.props.doc;
const nameDocs = new Array(docs.lengt)
for (let i = 0; i < docs.length; i++) {

    let element = docs[i].split("\\");*/