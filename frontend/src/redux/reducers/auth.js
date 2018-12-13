import {SIGN_IN} from "../actionTypes";

export function authReducer(state = {isAuthenticated: false, username: ""}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isAuthenticated: action.successful,
                username: action.username
            };
        default:
            return {
                isAuthenticated: false,
                username: ""
            };
    }
}