import axios from 'axios'
import {
    GET_DOCUMENTS,
    GET_DOCUMENT,
    GET_ERRORS,
    ADD_DOCUMENT,
    CLEAR_ERRORS,
    DELETE_DOCUMENT,
    CREATE_TEXT
} from './types'
import {
    tokenConfig
} from './OAuth2Action'

export const getDocuments = () => async (dispatch) => {
    await axios.get('/document', tokenConfig()).then(res => {
            dispatch({
                type: GET_DOCUMENTS,
                payload: res.data
            })
        })
        .catch((err) => {
           /*  dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) */
            console.log(err);
            
        });
};

export const getDocumentById = (id) => (dispatch, getSate) => {
    axios.get(`/document/${id}`, tokenConfig(getSate)).then(res => dispatch({
            type: GET_DOCUMENT,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const getDocumentByName = (name) => dispatch => {
    axios.get(`/document_ByName/${name}`).then(res => dispatch({
            type: GET_DOCUMENT,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const newDocument = (newDoc) => dispatch => {
    axios.post('/new_document', newDoc)
        .then(res => {
            if (newDoc) {
                dispatch({
                    type: ADD_DOCUMENT,
                    payload: res.data
                })
                dispatch({
                    type: CLEAR_ERRORS
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const deleteDocument = (id) => (dispatch, getSate) => {
    axios.delete(`/delete_document/${id}`, tokenConfig(getSate)).then(res => {
            dispatch({
                type: DELETE_DOCUMENT,
                payload: id
            });
        })
        .catch((err) => {
            console.log(err);
        });

    dispatch(getDocuments())
};

export const updateDocumentName = (id, name) => dispatch => {
    axios.get(`/updateDocumentName?id=${id}&&name=${name}`).then(res => {
            dispatch({
                type: GET_DOCUMENT,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });        
        dispatch(getDocuments())
};