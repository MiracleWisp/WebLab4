import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signIn, signOut} from "../redux/actions";
import {connect} from 'react-redux';
import '../styles/LoginForm.css';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sign = () => {
        let formData = new FormData();
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            data: formData,
            withCredentials: true
        }).then(result => {
            if (result.status !== 200) {
                return this.props.signOut()
            }
            return axios({
                method: 'get',
                url: 'http://localhost:8080/api/roles',
                withCredentials: true
            })
        }).then(result => {
            this.props.signIn(result.data.successful, result.data.username)
        }).catch(err => {
            this.props.signOut();
            console.log(err);
        });


    };

    render() {
        return (
            this.props.isAuthenticated ?
                <h2>YES</h2> :
                <div>
                    <form id='signin-form' noValidate autoComplete="off">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                            variant="outlined"
                        />
                        <br/>
                        <TextField
                            id="outlined-password"
                            type='password'
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                            variant="outlined"
                        />
                        <br/>
                        <Button variant="contained" onClick={this.sign}>
                            SIGN IN
                        </Button>
                    </form>
                </div>
        );
    }
}

export default connect(
    null,
    {signIn, signOut}
)(LoginForm);