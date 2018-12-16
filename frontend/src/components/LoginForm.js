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
        this.state = {username: "", password: "", msg:''};
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
            this.setState({msg: 'Неверное имя пользователя или пароль'});
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
                        <div>{this.state.msg}</div>
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