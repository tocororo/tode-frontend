import axios from 'axios'
import {  GET_NOTIFICATION, GET_NOTIFICATION_NUMBER } from './types'
import {tokenConfig} from './AuthAction'

export const getNotifications = () => (dispatch, getSate) => {
    axios.get('/notifications', tokenConfig(getSate)).then(res => dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
    }))
};

export const getNotificationDocVersion = ({document_user, document_version}) => (dispatch, getSate) => {
    axios.get(
    `/notificationDocVersion?document_user=${document_user}&&document_version=${document_version}`,
    tokenConfig(getSate))
    .then(dispatch(getNotifications(), getNotificationsNumber() ))
};

export const getNotificationsNumber = () => (dispatch, getSate) => {
    axios.get('/notificationNumber', tokenConfig(getSate)).then(res => dispatch({
        type: GET_NOTIFICATION_NUMBER,
        payload: res.data
    }))
};