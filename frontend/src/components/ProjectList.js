import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Folder from '@material-ui/icons/Folder';
import {addProject, setProjects} from "../redux/actions";
import {Link} from "react-router-dom";
import ProjectDialog from "./ProjectDialog";

class ProjectList extends Component {
    constructor(props) {
        super(props);
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/projects',
            withCredentials: true
        }).then(result => {
            this.props.setProjects(result.data.data.map((project) => project.projectName));
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <ProjectDialog/>
                <List component="nav">
                    {this.props.projects}
                </List>
            </div>
        )
    }
}

export default connect((state) => ({
    projects: state.projectsReducer.projects.map((project, index) =>
        <ListItem button component={Link} to={'/projects/' + project} key={index}>
            <ListItemIcon>
                <Folder />
            </ListItemIcon>
            <ListItemText primary={project} />
        </ListItem>
    )
}), {
    setProjects
})(ProjectList);