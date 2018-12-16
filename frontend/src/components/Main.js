import React from 'react';
import {connect} from 'react-redux';
import {changeR} from "../redux/actions";
import LoginForm from './LoginForm'
import Welcome from './Welcome'

const Main = (props) => (
    props.isAuthenticated ?
        <Welcome/>:
        <LoginForm/>
);

const handleChangeR = (r) => {
    this.setState({r});
    this.props.changeR(this.state.r)
};

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(Main)

const mapStateToProps = state => {
    const r = state.r;
    return {r};
};

export default connect(
    mapStateToProps,
    {changeR}
)(Main);