import {createStore} from "redux";
import rootReducer from "./reducers"
import axios from "axios";

async function getInitState() {
    let state = {
        authReducer: {
            username: '',
            isAuthenticated: false
        }
    };
    const result = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/roles',
        withCredentials: true
    });
    console.log(result.status);
    if (result.status === 200) {
        state.authReducer.username = result.data.username;
        state.authReducer.isAuthenticated = result.data.successful;
    }
    return createStore(rootReducer, state, window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default getInitState();

/*
export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
)*/
