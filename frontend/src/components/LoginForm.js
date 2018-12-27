import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {setConnection, signIn, signOut} from "../redux/actions";
import {connect} from 'react-redux';
import '../styles/LoginForm.css';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", msg: '', ws: new WebSocket('ws://localhost:8080/name')};
        this.state.ws.onmessage = data => {
            console.log(data);
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sign = () => {
        this.state.ws.send(this.state.username);
        let formData = new FormData();
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            data: formData,
            withCredentials: true
        }).then(result => {
            this.props.setConnection(true);
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
            if (err.response) {
                this.setState({msg: 'Неверное имя пользователя или пароль'});
                this.props.signOut();
            } else {
                console.log(JSON.stringify(err));
                this.props.setConnection(false);
            }
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
    {signIn, signOut, setConnection}
)(LoginForm);