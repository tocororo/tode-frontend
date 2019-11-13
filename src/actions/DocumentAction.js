import axios from 'axios'
import { GET_DOCUMENTS, GET_DOCUMENT } from './types'

export const getDocuments = () => dispatch => {
    axios.get('/list').then(res => dispatch({
        type: GET_DOCUMENTS,
        payload: res.data
    }))
};

export const getDocument = (html) => dispatch => {
    axios.get(`/${html}`).then(res => dispatch({
        type: GET_DOCUMENT,
        payload: res.data
    }))
};