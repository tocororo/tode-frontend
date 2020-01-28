import axios from 'axios'
import { GET_DOCUMENT_VERSION, ADD_DOCUMENT } from './types'
import {tokenConfig} from './AuthAction'


export const getDocument_version = () => (dispatch, getState) => {
    axios.get('/document_version', tokenConfig(getState)).then(res => dispatch({
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

export const newDocument_version = (doc, history) => dispatch => {
    axios.post('/new_document_version', doc).then(res => dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    }))
    history.push('/document')
};