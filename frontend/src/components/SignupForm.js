import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signUp} from "../redux/actions";
import {connect} from 'react-redux';
import '../styles/LoginForm.css';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

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

    showSignUp = () => {

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
                <div id='form-wrapper'>
                    <form id='signin-form' noValidate autoComplete="off">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            id="outlined-password"
                            type='password'
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                        <br/>
                        <Button id='signin-button' variant="contained" onClick={this.sign}>
                            SIGN IN
                        </Button>
                        <div id='signup-chip'>
                            <Chip label="Нет аккаунта? Зарегистрироваться" variant="outlined" onClick={this.showSignUp}/>
                        </div>
                    </form>

                </div>
        );
    }
}

export default connect(
    null,
    {signUp}
)(LoginForm);