import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from 'react-select'
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {addPoint, changeR} from "../redux/actions";

const rs = [
    {label: 1},
    {label: 2},
    {label: 3},
    {label: 4},
    {label: 5}
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const xs = [
    {label: -3},
    {label: -2},
    {label: -1},
    {label: 0},
    {label: 1},
    {label: 2},
    {label: 3},
    {label: 4},
    {label: 5}
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {x: {label: 0, value: 0}, y: 0, r: {label: 1, value: 1}}
    }

    handleChangeX = (x) => {
        this.setState({x: x});
    };

    handleChangeY = (event) => {
        let yVal = event.target.value;
        this.setState({y: yVal, invalid: !this.validateY(yVal)});
    };

    handleChangeR = (r) => {
        this.props.changeR(r.value);
    };

    validateY = (yVal) => {
        return !isNaN(+yVal) && (yVal >= -3) && (yVal <= 3);
    };

    addPointAxios = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/points',
            data: {
                x: this.state.x.value,
                y: this.state.y,
                r: this.state.r.value,
            },
            withCredentials: true
        }).then(result => {
            console.log(result);
            if (!result.data.successful) {
                this.setErrMessage(result.data.data);
                return false;
            } else {
                this.props.addPoint(result.data.data);
                return true;
            }
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div className="form-wrap">
                <div id="form_header">
                    <h2>Add a point</h2>
                </div>
                <FormControl>
                    <FormHelperText className="helper-text">Choose R</FormHelperText>
                    <Select
                        options={rs}
                        value={{label: this.props.r, value: this.props.r}}
                        onChange={this.handleChangeR}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText className="helper-text">Choose X</FormHelperText>
                    <Select
                        options={xs}
                        value={this.state.x}
                        onChange={this.handleChangeX}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        value={this.state.y}
                        onChange={this.handleChangeY}
                        label="Enter Y"
                    />
                    <FormHelperText hidden={!this.state.invalid} className="alert-text">Invalid value</FormHelperText>
                </FormControl>
                <Button
                    variant="outlined"
                    disabled={this.state.invalid}
                    onClick={this.addPointAxios}
                >ADD</Button>
            </div>
        )
    };

    setErrMessage(message) {
        console.log(message);
    }

}

const mapStateToProps = state => ({
    r: state.pointsReducer.r,
});

export default connect(
    mapStateToProps,
    {addPoint, changeR}
)(Form);