import axios from 'axios'
import { GET_DOCUMENT_VERSION, GET_DOCUMENT_VERSION_ByID,
         ADD_DOCUMENT, GET_DOCUMENT_VERSION_CONTENT } from './types'
import {tokenConfig} from './AuthAction'


export const getDocument_version = () => (dispatch, getState) => {
    axios.get('/document_version', tokenConfig(getState)).then(res => dispatch({
        type: GET_DOCUMENT_VERSION,
        payload: res.data
    }))
};

export const getDocument_versionById = (id) => (dispatch) => {
    axios.get(`/document_version/${id}`).then(res => dispatch({
        type: GET_DOCUMENT_VERSION_ByID,
        payload: res.data
    }))
};

export const getDocument_version_content = (id) => (dispatch) => {
    axios.get(`/document_version_content/${id}`).then(res => dispatch({
        type: GET_DOCUMENT_VERSION_CONTENT,
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
    history.push('/documents')
};