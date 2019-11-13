import { combineReducers } from 'redux';
import UsersReducer from './UsersReducer'
import ErrorReducer from './ErrorReducer'
import AuthReducer from './AuthReducer'
import DocumentReducer from './DocumentReducer';

export default combineReducers({
    user: UsersReducer,
    error: ErrorReducer,
    auth: AuthReducer,
    doc: DocumentReducer
});