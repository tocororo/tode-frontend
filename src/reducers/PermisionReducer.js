import {  GET_PERMISION, ADD_PERMISION, DELETE_PERMISION } from '../actions/types'
const initialState = {
    permisions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
       
        case GET_PERMISION:
                
            return {
                ...state,
                permisions: action.payload
            };
        case ADD_PERMISION:
            return {
             ...state,
             permisions: [action.payload, ...state.permisions]
            };
            case DELETE_PERMISION:
            return {
                ...state,
                permisions: state.users.filter(doc => doc._id !== action.payload)
            };
        default:
            return state;
    }
}

