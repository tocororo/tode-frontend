import {
    USER_LOADING,
    OAUT2_LOADED,
    OAUT2_ERROR,
    LOGOUT_SUCCES,
    GET_ERRORS
} from './types';
import axios from 'axios'

export const OAuth2Loaded = () => async (dispatch) => {
    dispatch({
        type: USER_LOADING
    })
    
        await axios.get(`/user/${localStorage.getItem('sceibaId')}`).then(res => 
            dispatch({
            type: OAUT2_LOADED,
            payload: res.data
        })
        )
        .catch(err => {         
            dispatch({
                type: OAUT2_ERROR
            });
            console.log(err);
            
           /*  dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }); */
        }); 
};

export const logout = (history) => dispatch =>{
    //axios.get(`/logout`).then(
    dispatch ({
        type: LOGOUT_SUCCES        
    })
//)
/* 
    if (history) {        
        history.push(`/`)    
    } */
}

export const tokenConfig = () => {
    //headers
    const config = {
        headers: {
            "Content-type": "aplication/json"
        }
    }

    //if token add to headers
    if (localStorage.getItem('token')) { 
        config.headers['Autorizacion'] = localStorage.getItem('token'); 
        config.headers['sceibaId'] = localStorage.getItem('sceibaId');
    }

    return config
}