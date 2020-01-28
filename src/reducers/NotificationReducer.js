import {  GET_NOTIFICATION, GET_NOTIFICATION_NUMBER } from '../actions/types'
const initialState = {
    notifications: [],
    notificationsNumber:""
}

export default function (state = initialState, action) {
    switch (action.type) {
       
        case GET_NOTIFICATION:
                
            return {
                ...state,
                notifications: action.payload
            };
        case GET_NOTIFICATION_NUMBER:
           
           return {
               ...state,
               notificationsNumber: action.payload
           };     
        default:
            return state;
    }
}