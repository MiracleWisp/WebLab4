import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Checker from "./Checker"
import {signIn, signOut} from "../redux/actions";
import SignupForm from "./SignupForm";


class Root extends React.Component {
    render() {
        return (
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


export default connect(null, {signIn, signOut})(Root);
