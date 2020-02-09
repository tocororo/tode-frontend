import axios from 'axios'
import {  GET_NOTIFICATION, GET_NOTIFICATION_NUMBER, DELETE_NOTIFICATION, GET_REQUEST_NUMBER } from './types'
import {tokenConfig} from './AuthAction'
import {getDocuments} from './DocumentAction'

export const getNotifications = () => (dispatch, getSate) => {
    axios.get('/notifications', tokenConfig(getSate)).then(res => dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
    }))
};

export const getNotificationDocVersion = ({document, document_version}) => (dispatch, getSate) => {
    axios.get(
    `/notificationDocVersion?document=${document}&&document_version=${document_version}`,
    tokenConfig(getSate))
    .then(() => {
        dispatch(getNotificationsNumber());
        dispatch(getNotifications());
        dispatch(getDocuments());
  })
};

export const getNotificationForPermisions = ({document}) => (dispatch, getSate) => {
    axios.get(
    `/notificationForPermisions?document=${document}`,
    tokenConfig(getSate))
    .then(() => {
          dispatch(getNotificationsNumber());
          dispatch(getNotifications());
          dispatch(getDocuments());
    })
};

export const getNotificationsNumber = () => (dispatch, getSate) => {
    axios.get('/notificationNumber', tokenConfig(getSate)).then(res => dispatch({
        type: GET_NOTIFICATION_NUMBER,
        payload: res.data
    }))
};

export const getRequestNumber = () => (dispatch, getSate) => {
    axios.get('/requestNumber', tokenConfig(getSate)).then(res => dispatch({
        type: GET_REQUEST_NUMBER,
        payload: res.data
    }))
};

export const deleteNotification = ({id}) => (dispatch, getSate) => {
    axios.delete(`/delete_notification/${id}`, tokenConfig(getSate)).then(res => dispatch({
        type: DELETE_NOTIFICATION,
        payload: id
    }))
};