import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm'
import Welcome from './Welcome'

const Main = (props) => (
    props.isAuthenticated ?
        <Welcome/>:
        <LoginForm/>
);

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(Main);