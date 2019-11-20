import axios from 'axios'
import { GET_DOCUMENT_VERSION, ADD_DOCUMENT } from './types'



export const getDocument_version = () => dispatch => {
    axios.get('/document_version').then(res => dispatch({
        type: GET_DOCUMENT_VERSION,
        payload: res.data
    }))
};

export const getDocumentById = (id) => dispatch => {
    axios.get(`/document_version/${id}`).then(res => dispatch({
        type: GET_DOCUMENT_VERSION,
        payload: res.data
    }))
};

export const newDocument_version = doc => dispatch => {
    axios.post('/new_document_version', doc).then(res => dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    }))
};