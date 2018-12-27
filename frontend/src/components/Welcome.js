import '../styles/Welcome.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ProjectList from "./ProjectList";
import ProjectTabs from "./ProjectTabs";


const Welcome = (props) => (
    <div id='welcome'>
        <ProjectTabs/>
    </div>
);

export default connect((state) => ({username: state.authReducer.username}))(Welcome);