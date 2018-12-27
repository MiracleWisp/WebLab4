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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {open:false, username:'', currentProject:''};
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/projects',
            withCredentials: true
        }).then(result => {
            this.props.setProjects(result.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClose = () => {
        this.setState({open: false, username:''});
    };

    handleOpen = project => event => {
        this.setState({open: true, currentProject: project});
    };

    handleAdd = () => {
        console.log(this.state.username);
        axios({
            method: 'post',
            url: `http://localhost:8080/api/projects/${this.state.currentProject}/collaborators`,
            withCredentials: true,
            data: {
                username: this.state.username
            }
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <ProjectDialog/>
                <List component="nav">
                    {this.props.projects.map((project, index) =>
                        <ListItem button component={Link} to={'/projects/' + project} key={index}>
                            <ListItemIcon>
                                <Folder/>
                            </ListItemIcon>
                            <ListItemText primary={project}/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Collaborators" onClick={this.handleOpen(project)}>
                                    <PersonAdd/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Добавить пользователя в проект</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите имя пользователя
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={this.state.projectName}
                            onChange={this.handleChange('username')}
                            id="name"
                            label="Имя пользователя"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отменить
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Добавить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect((state) => ({
    projects: state.projectsReducer.projects
}), {
    setProjects
})(ProjectList);