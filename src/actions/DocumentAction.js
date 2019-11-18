import axios from 'axios'
import {  GET_DOCUMENT, ADD_DOCUMENT } from './types'



export const getDocument = () => dispatch => {
    axios.get('/document').then(res => dispatch({
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

export const     newDocument = doc => dispatch => {
    axios.post('/new_document',doc).then(res => dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    }))
};