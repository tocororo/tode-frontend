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

import {OAuth2Loaded} from '../actions/OAuth2Action'

export const getUsersToPermission = ({
    value,
    document
}) => (dispatch, getState) => {

    axios.get(`/user_topermision?value=${value}&&document=${document}`, tokenConfig(getState)

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

export const updateUser = user => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/updateUser', user).then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });

        dispatch(OAuth2Loaded())
};

export const updateImage = image => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/updateImage', image).then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });

        dispatch(OAuth2Loaded())
};

export const deleteUser = id => (dispatch, getState) => {
    axios.delete(`/delete_user/${id}`, tokenConfig(getState)).then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};