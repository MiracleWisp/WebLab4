import {ADD_POINT, CHANGE_R, SIGN_IN, SIGN_OUT, SIGN_UP} from "./actionTypes";

export const addPoint = (x, y) => ({
        type: ADD_POINT,
        x,
        y
});

export const signUp = (login, password) => ({
    type: SIGN_UP,
    login,
    password
});

export const signIn = (login, password) => ({
    type: SIGN_IN,
    login,
    password
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const changeR = (r) => ({
    type: CHANGE_R,
    r
});