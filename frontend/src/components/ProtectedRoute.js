import React from 'react'
import {connect} from 'react-redux';

import {Redirect, Route, withRouter} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            rest.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/'/>
        )
    }}/>
);

export default withRouter(connect((state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
})(PrivateRoute));