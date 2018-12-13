// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import store from "./redux/store";
// custom
import './styles/index.css';
import Root from "./components/Root";
import Provider from "react-redux/es/components/Provider";

const rootElement = document.getElementById("root");

// redux
ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>, rootElement);