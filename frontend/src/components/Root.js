import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Checker from "./Checker"
import {signIn, signOut} from "../redux/actions";
import SignupForm from "./SignupForm";
import {Banner} from "./Banner";


class Root extends React.Component {
    render() {
        return (
            !this.props.isConnected ?
                <Banner hidden={this.props.isConnected} text="Server is temporarily unavailable"/> :
                <Router>
                    <div>
                        <Route path="/*" component={Header}/>
                        <ProtectedRoute path='/main' component={Checker}/>
                        <Route exact path="/" component={Main}/>
                        <Route path='/signup' component={SignupForm}/>
                    </div>
                </Router>
        )
    }
}


export default connect((state) => ({
    isConnected: state.connectionReducer.isConnected
}), {signIn, signOut})(Root);
