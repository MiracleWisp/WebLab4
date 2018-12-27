import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import connect from "react-redux/es/connect/connect";
import {addProject, setProjects} from "../redux/actions";
import axios from "axios";

class ProjectDialog extends React.Component {
    state = {
        open: false,
        projectName: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleAdd = () => {
        console.log(this.state.projectName);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/projects',
            withCredentials: true,
            data: {
                projectName: this.state.projectName
            }
        }).then(result => {
            this.props.addProject(result.data.data.projectName);
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add project
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Создание проекта</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите имя проекта
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={this.state.projectName}
                            onChange={this.handleChange('projectName')}
                            id="name"
                            label="Имя проекта"
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
        );
    }
}

export default connect(null, {addProject})(ProjectDialog);