import axios from 'axios'
import {
    GET_PERMISION,
    ADD_PERMISION,
    DELETE_PERMISION
} from './types'
import {
    tokenConfig
} from './OAuth2Action'
import {
    getDocuments
} from './DocumentAction'

export const getPermisions = (documentId) => (dispatch, getSate) => {
    axios.get(`/permision/${documentId}`, tokenConfig(getSate)).then(res => dispatch({
            type: GET_PERMISION,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const newPermision = newPermision => dispatch => {
    axios.post('/new_permision', newPermision).then(res => {
            dispatch({
                type: ADD_PERMISION,
                payload: res.data
            });
            dispatch(getDocuments())
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deletePermision = id => (dispatch) => {
    axios.delete(`/delete_permision/${id}`).then(res => {
            dispatch({
                type: DELETE_PERMISION,
                payload: id
            });
            dispatch(getDocuments())
        })
        .catch((err) => {
            console.log(err);
        });        
};

export const cancelPermisionShared = id => (dispatch) => {
    axios.delete(`/cancelPermisionShared/${id}`).then(res => {
            dispatch({
                type: DELETE_PERMISION,
                payload: id
            });
            dispatch(getDocuments())
        })
        .catch((err) => {
            console.log(err);
        });
};