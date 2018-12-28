import React, {Component} from "react";
import Plot from './Plot'
import PointTable from "./PointTable";
import '../styles/checker.css';
import Form from "./Form";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {setPoints, addPoint} from "../redux/actions";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {projectName: props.match.params.projectName, ws: new WebSocket('ws://localhost:8080/websocket')};
        this.state.ws.onmessage = data => {
            console.log(data.data);
            this.props.addPoint(JSON.parse(data.data));
        };
        this.state.ws.onopen = () =>{
            this.state.ws.send(this.state.projectName);
        };
        this.refresh();
    }

    refresh = () => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/projects/${this.state.projectName}/points`,
            withCredentials: true
        }).then(result => {
            this.props.setPoints(result.data);
        }).catch(err => {
            console.log(err);
        });
    };

    componentWillUnmount() {
        this.state.ws.close();
    }

    render() {
        return (
            <div className="content-wrap">
                <Plot projectName={this.state.projectName}/>
                <Form projectName={this.state.projectName}/>
                <PointTable/>
            </div>
        )
    }
}

export default connect(
    null,
    {setPoints, addPoint}
)(Project);