import {SET_CONNECTION} from "../actionTypes";

export function connectionReducer (state = {isConnected: true}, action) {
    switch (action.type) {
        case SET_CONNECTION:
            return {
                isConnected: action.successful
            };
        default:
            return state;
    }
}