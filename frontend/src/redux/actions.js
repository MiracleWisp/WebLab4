import {ADD_POINT, SET_POINTS, CHANGE_R, SIGN_IN, SIGN_OUT, SIGN_UP, SET_CONNECTION, ADD_PROJECT, SET_PROJECTS} from "./actionTypes";

export const addPoint = (point) => ({
    type: ADD_POINT,
    point
});

export const setPoints = (points) => ({
    type: SET_POINTS,
    points
});

export const signUp = (login, password) => ({
    type: SIGN_UP,
    login,
    password
});

export const signIn = (successful, username) => ({
    type: SIGN_IN,
    successful,
    username
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const changeR = (r) => ({
    type: CHANGE_R,
    r: r
});

export const setConnection = (successful) => ({
    type: SET_CONNECTION,
    successful
});

export const setProjects = (projects) => ({
    type: SET_PROJECTS,
    projects
});

export const addProject = (project) => ({
    type: ADD_PROJECT,
    project
});