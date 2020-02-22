import axios from 'axios'
import {
    GET_DOCUMENTS,
    GET_DOCUMENT,
    GET_ERRORS,
    DELETE_DOCUMENT,
    CREATE_TEXT
} from './types'
import {
    tokenConfig
} from './OAuth2Action'


export const getDocuments = () => (dispatch, getSate) => {
    axios.get('/document', tokenConfig(getSate)).then(res => {
            dispatch({
                type: GET_DOCUMENTS,
                payload: res.data
            })
        })
        .catch((err) => {
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

export const newDocument = (doc, history, url) => dispatch => {
        axios.post('/new_document', doc)
            .then(res => history.push(url))
                .catch((err) => {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                });
                /* axios.post('/new_document', doc).then(res => dispatch({
                        type: ADD_DOCUMENT,
                        payload: res.data
                    }))
                    .catch((err) => {
                        console.log(err);
                    });
                history.push(url) */
            };

        export const deleteDocument = (id) => (dispatch, getSate) => {
            axios.delete(`/delete_document/${id}`, tokenConfig(getSate)).then(res => dispatch({
                    type: DELETE_DOCUMENT,
                    payload: id
                }))
                .catch((err) => {
                    console.log(err);
                });
        };

        export const createText = (name, text, history) => (dispatch) => {
            axios.post(`/createText?name=${name}`, text).then(res => dispatch({
                    type: CREATE_TEXT,
                    payload: text
                }))
                .catch((err) => {
                    console.log(err);
                });
            history.push(`/documents`)
        };

        export const updateDocumentName = (id, name) => dispatch => {
            axios.get(`/updateDocumentName?id=${id}&&name=${name}`).then(res => {
                    dispatch({
                        type: GET_DOCUMENT,
                        payload: res.data
                    });
                    dispatch(getDocuments())
                })
                .catch((err) => {
                    console.log(err);
                });
        };