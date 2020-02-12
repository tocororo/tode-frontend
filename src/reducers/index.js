import { combineReducers } from 'redux';
import UsersReducer from './UsersReducer'
import ErrorReducer from './ErrorReducer'
import AuthReducer from './AuthReducer'
import DocumentReducer from './DocumentReducer';
import DocumentVersionReducer from './DocumentVersionReducer';
import PermisionReducer from './PermisionReducer';
import NotificationReducer from './NotificationReducer';
import MessagesReducer from './MessagesReducer';

export default combineReducers({
    user: UsersReducer,
    message: MessagesReducer,
    error: ErrorReducer,
    auth: AuthReducer,
    doc: DocumentReducer,
    doc_version: DocumentVersionReducer,
    permision: PermisionReducer,
    notification: NotificationReducer
});