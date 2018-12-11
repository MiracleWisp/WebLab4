import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import {Login} from "./Login";
import {Main} from "./Main";
import theme from '../assets/react-toolbox/theme'
import '../assets/react-toolbox/theme.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const Root = ({store}) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Route path="/*" component={Header}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        </ThemeProvider>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root
