import {Component} from "react";
import React from 'react';
import '../styles/banner.css'

export class Banner extends Component {
    render() {
        return (
            <div id="banner_outer" hidden={this.props.hidden}>
                <div id="banner_inner">
                    <h1>{this.props.text}</h1>
                </div>
            </div>
        )
    }
}