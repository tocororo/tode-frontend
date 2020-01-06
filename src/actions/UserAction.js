import axios from 'axios'
import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    ITEMS_LOADING,
    GET_USERS_TOPERMISONS
} from '../actions/types'
import { tokenConfig } from './AuthAction'
import { returnErrors } from './ErrorAction'

export const getUsersToPermission = ({ value, document_id }) => dispatch => {
    const params = ({
        value,
        document_id
    })
    // hacer una url nueva que reciba el string y el id del doc... y en base a esto responda la lista de usuarios correspondiente
    axios.get('/user_topermision',{
        headers: {
            'Content-Type': 'application/json'
        },
        params
    }).then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    }))
};

export const getUsers = () => dispatch => {
    axios.get('/user').then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    }))
};

export const deleteUser = id => (dispatch, getState) => {
    axios.delete(`/delete_user/${id}`, tokenConfig(getState)).then(res => dispatch({
        type: DELETE_USER,
        payload: id
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addUser = user => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/register', user).then(res => dispatch({
        type: ADD_USER,
        payload: res.data
    }))
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};