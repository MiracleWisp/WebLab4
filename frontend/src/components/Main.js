import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm'
import Welcome from './Welcome'

class Main extends Component {
    render() {
        return (this.props.isAuthenticated ?
            <Welcome/>:
            <LoginForm/>
        )
    }
}

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(Main);