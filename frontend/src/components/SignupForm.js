import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import '../styles/LoginForm.css';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", repeatedPassword: "", msg: ""};
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    signUp = () => {
        if (this.state.password !== this.state.repeatedPassword){
            this.setState({
                msg: 'Пароли не совпадают'
            });
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/signup',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            withCredentials: true
        }).then(_ => {
            this.setState({
                msg: 'Вы успешно зарегестрированы'
            });
        }).catch(err => {
            if (err.response.status === 409) this.setState({
                msg: 'Имя пользователя уже занято'
            }); else console.log(err);
        });
    };

    render() {
        return (
            this.props.isAuthenticated ?
                <Redirect to='/'/> :
                <div className='form-wrapper'>
                    <form id='signup-form' noValidate autoComplete="off">
                        <TextField
                            label="Name"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            type='password'
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            type='password'
                            label="Repeat password"
                            value={this.state.repeatedPassword}
                            onChange={this.handleChange('repeatedPassword')}
                            margin="normal"
                        />
                        <br/>
                        <div>{this.state.msg}</div>
                        <Button variant="outlined" onClick={this.signUp}>
                            SIGN UP
                        </Button>
                    </form>
                </div>
        );
    }
}

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(SignupForm);