import {CHANGE_R} from "../actionTypes";

const initialState = {
    allIds: [],
    r: 1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_R: {
            const r = action.r;
            return {
                ...state,
                r,
                allIds: [...state.allIds]
            }
        }
        default:
            return state;
    }
}