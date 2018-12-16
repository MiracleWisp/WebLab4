import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Checker from "./Checker"
import {signIn, signOut} from "../redux/actions";
import axios from "axios";
import SignupForm from "./SignupForm";


class Root extends React.Component {
    constructor(props) {
        super(props);
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/roles',
            withCredentials: true
        }).then(result => {
            console.log(result.status);
            result.status === 200 ?
                this.props.signIn(result.data.successful, result.data.username) :
                this.props.signOut()
        }).catch(err => {
            this.props.signOut();
            console.log(err);
        });
    }

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
