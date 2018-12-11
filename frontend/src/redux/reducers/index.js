import { combineReducers } from "redux";
import points from "./points";
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    routing: routerReducer,
    points
});