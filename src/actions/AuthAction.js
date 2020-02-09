import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    GET_USER_AUTH,
    LOGIN_SUCCES,
    LOGIN_FAIL,
    REGISTER_SUCCES,
    REGISTER_FAIL,
    LOGOUT_SUCCES,
    EDIT_SUCCES,
    EDIT_FAIL
} from './types';
import axios from 'axios';
import { returnErrors } from '../actions/ErrorAction'

//check token y agregar user
export const loadUsers = () => (dispatch, getSate) => {
    //User Loading
    dispatch({ type: USER_LOADING })

    axios.get('/user_auth', tokenConfig(getSate)).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

export const getUserAuth = () => (dispatch, getSate) => {
    axios.get('/user_auth', tokenConfig(getSate)).then(res => dispatch({
        type: GET_USER_AUTH,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};


//registrar user
export const register = ({ name, email, password, rol }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //request body
    const body = JSON.stringify({ name, email, password, rol })
    console.log(body);
    

    axios.post('/register', body, config).then(res => dispatch({
        type: REGISTER_SUCCES,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    });

};

//login user
export const login = ({ email, password }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //request body
    const body = JSON.stringify({ email, password })

    axios.post('/register_auth', body, config).then(res => dispatch({
        type: LOGIN_SUCCES,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        });
    });
};

//Logou user
export const logout = () => {
    return {
        type: LOGOUT_SUCCES
    };
}

//setup config/headers and token
export const tokenConfig = getSate => {
    //get token del localStorage
    const token = getSate().auth.token;

    //headers
    const config = {
        headers: {
            "Content-type": "aplication/json"
        }
    }

    //if token add to headers
    if (token) { config.headers['x-auth-token'] = token; }

    return config
}


export const editUser = ({ _id, name, email, password }) => (dispatch, getSate) => {

    //request body
    const body = JSON.stringify({ _id, name, email, password })

    axios.put(`/edit_user/${_id}`, body, tokenConfig(getSate)).then(res => dispatch({
        type: EDIT_SUCCES,
        payload: res.data
    })).catch(err => {
        //dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_FAIL'));
        dispatch({
            type: EDIT_FAIL
        });
    });

};

export const loginOauth2 = () => (dispatch) => {
    axios.get('/oauth2')
};