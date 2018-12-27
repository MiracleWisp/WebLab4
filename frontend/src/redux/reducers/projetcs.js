import {ADD_PROJECT, SET_PROJECTS} from "../actionTypes";

const initialState = {
    projects: [],
    sharedProjects: []
};

export function projectsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PROJECT: {
            const projects = state.projects.slice(0);
            projects.push(action.project);
            return {
                ...state,
                projects

            };
        }

        case SET_PROJECTS: {
            return {
                ...state,
                projects: action.projects
            }
        }

        default:
            return state;
    }
}