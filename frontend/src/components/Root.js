import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import {Login} from "./Login";
import {Main} from "./Main";

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Header}/>
                <Route path="/main" component={Main}/>
                <Route path="/login" component={Login}/>
            </div>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root
