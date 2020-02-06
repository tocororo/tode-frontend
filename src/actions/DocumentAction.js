import axios from 'axios'
import {  GET_DOCUMENTS, GET_DOCUMENT, ADD_DOCUMENT, DELETE_DOCUMENT, CREATE_TEXT } from './types'
import {tokenConfig} from './AuthAction'


export const getDocuments = () => (dispatch, getSate) => {
    axios.get('/document',tokenConfig(getSate)).then(res => dispatch({
        type: GET_DOCUMENTS,
        payload: res.data
    }))
};

export const getDocumentById= (id) => dispatch => {
    axios.get(`/document/${id}`).then(res => dispatch({
        type: GET_DOCUMENT,
        payload: res.data
    }))
};

export const newDocument = (doc, history, name) => dispatch => {
    axios.post('/new_document',doc).then(res => dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    }))
    history.push(`/add-content/${name}`)
};

export const deleteDocument = id => (dispatch) => {
    axios.delete(`/delete_document/${id}`).then(res => dispatch({
        type: DELETE_DOCUMENT,
        payload: id
    }))
};

export const createText = (name, text, history) => (dispatch) => {
    axios.post(`/createText?name=${name}`, text).then(res => dispatch({
        type: CREATE_TEXT,
        payload: text
    }))
    history.push(`/documents`)
};