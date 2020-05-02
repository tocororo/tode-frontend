import axios from 'axios'
import {
    GET_NOTIFICATION,
    GET_NOTIFICATION_NUMBER,
    DELETE_NOTIFICATION,
    GET_REQUEST_NUMBER
} from './types'
import {
    tokenConfig
} from './OAuth2Action'
import {
    getDocuments
} from './DocumentAction'

export const getNotifications = () => (dispatch, getSate) => {
    axios.get('/notifications', tokenConfig(getSate)).then(res => dispatch({
            type: GET_NOTIFICATION,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const getNotificationDocVersion = (document, document_version) => (dispatch, getSate) => {
    axios.get(`/notificationDocVersion?document=${document}&&document_version=${document_version}`,
        tokenConfig(getSate))

    dispatch(getNotificationsNumber());
    dispatch(getNotifications());
};

export const getNotificationForPermisions = ({
    document
}) => (dispatch, getSate) => {
    axios.get(`/notificationForPermisions?document=${document}`, tokenConfig(getSate))

    dispatch(getRequestNumber());
    dispatch(getNotifications());
    dispatch(getDocuments())
};

export const getNotificationsNumber = () => (dispatch, getSate) => {
    axios.get('/notificationNumber', tokenConfig(getSate)).then(res => dispatch({
            type: GET_NOTIFICATION_NUMBER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const getRequestNumber = () => (dispatch, getSate) => {
    axios.get('/requestNumber', tokenConfig(getSate)).then(res => dispatch({
            type: GET_REQUEST_NUMBER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};

export const deleteNotification = (document) => (dispatch, getSate) => {
    axios.delete(`/delete_notification/${document}`, tokenConfig(getSate)).then(res => dispatch({
            type: DELETE_NOTIFICATION,
            payload: document
        }))
        .catch((err) => {
            console.log(err);
        });
    
    dispatch(getNotifications());
    dispatch(getRequestNumber());
};