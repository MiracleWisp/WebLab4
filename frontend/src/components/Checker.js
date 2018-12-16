import React, {Component} from "react";
import Plot from './Plot'
import PointTable from "./PointTable";
import '../styles/checker.css';
import Form from "./Form";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {setPoints} from "../redux/actions";

class Checker extends Component {
    constructor(props) {
        super(props);
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/points',
            withCredentials: true
        }).then(result => {
            this.props.setPoints(result.data);
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <div className="content-wrap">
                <Plot/>
                <Form/>
                <PointTable/>
            </div>
        )
    }
}

export default connect(
    null,
    {setPoints}
)(Checker);