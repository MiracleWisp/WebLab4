import {combineReducers} from "redux";
import {pointsReducer} from "./points";
import {routerReducer} from 'react-router-redux'
import {authReducer} from './auth'

export default combineReducers({
    routing: routerReducer,
    authReducer,
    pointsReducer
});