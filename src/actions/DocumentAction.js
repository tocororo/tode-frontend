import axios from 'axios'
import {  GET_DOCUMENT, ADD_DOCUMENT, DELETE_DOCUMENT } from './types'
import {tokenConfig} from './AuthAction'

export const getDocument = () => (dispatch, getSate) => {
    axios.get('/document',tokenConfig(getSate)).then(res => dispatch({
        type: GET_DOCUMENT,
        payload: res.data
    }))
};

export const getDocumentById= (id) => dispatch => {
    axios.get(`/document/${id}`).then(res => dispatch({
        type: GET_DOCUMENT,
        payload: res.data
    }))
};

export const newDocument = doc => dispatch => {
    axios.post('/new_document',doc).then(res => dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    }))
};

export const deleteDocument = id => (dispatch) => {
    axios.delete(`/delete_document/${id}`).then(res => dispatch({
        type: DELETE_DOCUMENT,
        payload: id
    }))
};