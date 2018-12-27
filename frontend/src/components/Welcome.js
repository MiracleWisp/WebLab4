import '../styles/Welcome.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ProjectList from "./ProjectList";


const Welcome = (props) => (
    <div id='welcome'>
        Добро пожаловать, {props.username} <br/>
        Выберите готовый проект или создайте новый<br/>
        <br/>
        <ProjectList/>
    </div>
);

export default connect((state) => ({username: state.authReducer.username}))(Welcome);