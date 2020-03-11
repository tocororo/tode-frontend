import axios from 'axios'
import {
    GET_DOCUMENT_VERSION,
    GET_DOCUMENT_VERSION_ByID,
    ADD_DOCUMENT_VERSION,
    GET_DOCUMENT_VERSION_CONTENT
} from './types'
import {
    tokenConfig
} from './OAuth2Action'


export const getDocument_version = () => (dispatch, getState) => {
    axios.get('/document_version', tokenConfig(getState)).then(res => {dispatch({
            type: GET_DOCUMENT_VERSION,
            payload: res.data
        })})
        .catch((err) => {
            console.log(err);
        });
};

export const getDocument_versionById = (id) => (dispatch) => {
    axios.get(`/document_version/${id}`).then(res => dispatch({
            type: GET_DOCUMENT_VERSION_ByID,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const getDocument_version_content = (id) => (dispatch) => {
    axios.get(`/document_version_content/${id}`).then(res => {
        console.log(JSON.stringify(res.data));
        
        dispatch({
            type: GET_DOCUMENT_VERSION_CONTENT,
            payload: res.data
        })})
        .catch((err) => {
            console.log(err);
        });
};

export const newDocument_version = (formData, history) => dispatch => { 
    console.log(formData);
       
    axios.post('/new_document_version', formData).then(res => dispatch({
            type: ADD_DOCUMENT_VERSION,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
    history.push('/documents')
};

export const editDocument_version = (formData, history) => dispatch => { 
    console.log(formData);
       
    axios.post('/put_document_version', formData).then(res => dispatch({
            type: ADD_DOCUMENT_VERSION,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
    history.push('/documents')
};