import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
    errorsMessages: {},
    status: null,
    id: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:        
            return {errorsMessages:action.payload};
        case CLEAR_ERRORS:
            return { errorsMessages: {} }
        default:
            return state;
    }
}