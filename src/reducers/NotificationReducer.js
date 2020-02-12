import {  GET_NOTIFICATION, GET_NOTIFICATION_NUMBER, DELETE_NOTIFICATION } from '../actions/types'
const initialState = {
    notifications: [],
    notificationsNumber:0
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
         case DELETE_NOTIFICATION:
           return {
               ...state,
               notifications: state.notifications.filter(notify => notify._id !== action.payload)
           };    
        default:
            return state;
    }
}