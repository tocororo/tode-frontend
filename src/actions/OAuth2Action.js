import {
    USER_LOADING,
    OAUT2_LOADED,
    OAUT2_ERROR,
    LOGOUT_SUCCES
} from './types';
import axios from 'axios'

export const OAuth2Loaded = () => async (dispatch) => {
    dispatch({
        type: USER_LOADING
    })
    
        await axios.get(`/user/${localStorage.getItem('sceibaId')}`).then(res => dispatch({
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

export const logout = (history) => dispatch =>{
    axios.get(`/logout`).then(
    dispatch ({
        type: LOGOUT_SUCCES        
    })
)/* 
    if (history) {        
        history.push(`/`)    
    } */
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
    if (localStorage.getItem('token')) { 
        config.headers['Autorizacion'] = localStorage.getItem('token'); 
        config.headers['sceibaId'] = localStorage.getItem('sceibaId');
    }

    return config
}