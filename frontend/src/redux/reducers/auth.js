import {SIGN_IN, SIGN_OUT} from "../actionTypes";

export function authReducer(state = {isAuthenticated: false, username: ""}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isAuthenticated: action.successful,
                username: action.username
            };
        case SIGN_OUT:
            return {
                isAuthenticated: false,
                username: ""
            };
        default:
            return state;
    }
}