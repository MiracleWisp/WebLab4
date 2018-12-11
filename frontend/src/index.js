// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import store from "./redux/store";

// custom
import './styles/index.css';
import Root from "./components/Root";

const rootElement = document.getElementById("root");

// redux
ReactDOM.render(<Root store={store}/>, rootElement);