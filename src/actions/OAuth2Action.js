import {
    USER_LOADING,
    OAUT2_LOADED,
    OAUT2_ERROR,
    LOGOUT_SUCCES
} from './types';
import axios from 'axios'

export const OAuth2Loaded = (sceibaId) => dispatch => {
    dispatch({
        type: USER_LOADING
    })

        axios.get(`/user/${sceibaId}`).then(res => dispatch({
            type: OAUT2_LOADED,
            payload: res.data
        })
        )
        .catch(err => {
            console.log(err);            
            dispatch({
                type: OAUT2_ERROR
            });
        }); 
};

export const logout = (history) => {
    history.push(`/`)
    return {
        type: LOGOUT_SUCCES
    };
}

export const tokenConfig = getSate => {
    //get token del localStorage
    const token = getSate().oauth2.token
    const user = getSate().oauth2.oauth2Users
    

    //headers
    const config = {
        headers: {
            "Content-type": "aplication/json"
        }
    }

    //if token add to headers
    if (token) { 
        config.headers['Autorizacion'] = token; 
        config.headers['User'] = user;
    }

    return config
}