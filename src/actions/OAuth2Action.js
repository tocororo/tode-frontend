import {
    USER_LOADING,
    OAUT2_LOADED,
    OAUT2_ERROR,
    LOGOUT_SUCCES
} from './types';
import axios from 'axios'

export const OAuth2Loaded = (sceibaId) => (dispatch, getSate) => {
    dispatch({
        type: USER_LOADING
    })
    if (sceibaId) {
        axios.get(`/user/${sceibaId}`, tokenConfig(getSate)).then(res => dispatch({
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
    }
};

export const logout = (history) => dispatch =>{
    dispatch ({
        type: LOGOUT_SUCCES
        
    });
    history.push(`/`)    
}

export const tokenConfig = getSate => {
    //get token del localStorage
    const token = getSate().oauth2.token
    const sceibaId = getSate().oauth2.sceibaId   
    

    //headers
    const config = {
        headers: {
            "Content-type": "aplication/json"
        }
    }

    //if token add to headers
    if (token) { 
        config.headers['Autorizacion'] = token; 
        config.headers['sceibaId'] = sceibaId;
    }

    return config
}