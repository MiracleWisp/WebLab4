import '../styles/Welcome.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


const Welcome = (props) => (
    <div id='welcome'>
        Добро пожаловать, {props.username} <br/>
        Чтобы перейти к нашей замечательной лабе, нажмите кнопку ниже <br/>
        <Button variant="contained" component={Link} to="/main">
            ПЕРЕЙТИ К ГРАФИКУ
        </Button>
    </div>
);

export default connect((state) => ({username: state.authReducer.username}))(Welcome);