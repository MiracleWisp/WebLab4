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
        this.state = {username: "", password: "", repeatedPassword: "", isLogin: true};
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    showSignUp = (e) => {
        e.preventDefault();
        this.setState({
            username:'',
            password:''
        })
    };

    signUp = () => {
        // TODO
        // проверка, что два введенных пароля совпадают
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/signup',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            withCredentials: true
        }).then(result => {
            this.setState({
                username:'',
                password:'',
                repeatedPassword:'',
                isLogin:true
            });
            console.log("Вы успешно зарегистророваны")
        }).catch(err => {
            this.props.signOut();
            console.log(err);
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
                <div className='form-wrapper'>
                    <form id='signin-form' noValidate autoComplete="off">
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
                        <a href='/signup'>Нет аккаунта? Зарегистрироваться</a> <br/>
                        <Button variant="outlined" onClick={this.sign}>
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