import { combineReducers } from 'redux';
import UsersReducer from './UsersReducer'
import ErrorReducer from './ErrorReducer'
import DocumentReducer from './DocumentReducer';
import DocumentVersionReducer from './DocumentVersionReducer';
import PermisionReducer from './PermisionReducer';
import NotificationReducer from './NotificationReducer';
import MessagesReducer from './MessagesReducer';
import OAuth2Reducer from './OAuth2Reducer'

export default combineReducers({
    user: UsersReducer,
    message: MessagesReducer,
    error: ErrorReducer,
    oauth2: OAuth2Reducer,
    doc: DocumentReducer,
    doc_version: DocumentVersionReducer,
    permision: PermisionReducer,
    notification: NotificationReducer
});