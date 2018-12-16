import {ADD_POINT, CHANGE_R, SET_POINTS} from "../actionTypes";

const initialState = {
    points: [],
    r: 1
};

export function pointsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POINT: {
            const points = state.points.slice(0);
            points.push(action.point);
            return {
                ...state,
                points

            };
        }

        case SET_POINTS: {
            return {
                ...state,
                points: action.points
            }
        }

        case CHANGE_R: {
            return {
                ...state,
                r: action.r
            }
        }

        default:
            return state;
    }
}