import axios from 'axios'
import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    ITEMS_LOADING
} from '../actions/types'
import {
    tokenConfig
} from './OAuth2Action'
import {
    returnErrors
} from './ErrorAction'

export const getUsersToPermission = ({
    value,
    document_id
}) => (dispatch, getState) => {

    axios.get(`/user_topermision?value=${value}&&document_id=${document_id}`, tokenConfig(getState)

        ).then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const getUsers = () => (dispatch, getState) => {
    axios.get('/user', tokenConfig(getState)).then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const deleteUser = id => (dispatch, getState) => {
    axios.delete(`/delete_user/${id}`, tokenConfig(getState)).then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addUser = user => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/register', user).then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};