import React from 'react';
import '../styles/plot.css'
import {connect} from 'react-redux'
import {addPoint, setConnection} from "../redux/actions";
import axios from "axios";

class Plot extends React.Component {

    constructor(props) {
        super(props);
        this.plotClicked = this.plotClicked.bind(this);

    }

    // plotClicked(event){
    //     if (document.elementFromPoint(event.clientX, event.clientY).tagName !== "circle") {
    //         let r = window.r1;
    //         let oX = convertXReverse(event.offsetX, r); //=== undefined ? event.layerX : event.offsetX;
    //         let oY = convertYReverse(event.offsetY, r); //=== undefined ? event.layerY : event.offsetY;
    //         addPoint(oX, oY, r);
    //     }
    //
    //     function addPoint(x, y, r) {
    //         // document.getElementById("pointForm:user_X_hidden").value = x;
    //         remoteX([{name: 'x_value', value: x}]);
    //         remoteY([{name: 'y_value', value: y}]);
    //         remoteR([{name: 'r_value', value: r}]);
    //         remoteAdd();
    //     }
    //
    //     function convertXReverse(cx) {
    //         return (cx - 200) * window.r1 / 160;
    //     }
    //
    //     function convertYReverse(cy) {
    //         return (cy - 200) * window.r1 / -160;
    //     }
    // }

    convertX(x) {
        return 120 * x / this.props.r + 150;
    }

    convertY(y) {
        return 150 - 120 * y / this.props.r;
    }

    convertXReverse(cx) {
        return (cx - 225) * +this.props.r / 175;
    }

    convertYReverse(cy) {
        return (cy - 225) * +this.props.r / -175;
    }

    plotClicked(event) {
        this.addPointAxios({
            x: this.convertXReverse(+event.nativeEvent.offsetX),
            y: this.convertYReverse(+event.nativeEvent.offsetY),
            r: this.props.r,
        });
    }

    static validatePoint(point) {
        return (point.x <= 5 && point.x >= -3 && point.y <= 3 && point.y >= -3);
    }

    addPointAxios = (point) => {
        if (Plot.validatePoint(point)) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/points',
                data: point,
                withCredentials: true
            }).then(result => {
                this.props.setConnection(true);
                if (!result.data.successful) {
                    this.setErrMessage(result.data.data);
                    return false;
                } else {
                    this.props.addPoint(result.data.data);
                    return true;
                }
            }).catch(err => {
                console.log(err);
                this.props.setConnection(false);
            });
        }
    };

    setErrMessage(message) {
        console.log("Error: " + message);
    }

    render() {
        return (
            <div className="plot-wrap">
                <svg id="svg_plot" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 300 300"
                     onClick={this.plotClicked}
                >
                    <title>Plot</title>

                    <rect className="cls-1" x="30" y="150" width="120" height="120"/>
                    <path className="cls-1" d="M150,30V150H30A119.992,119.992,0,0,1,150,30Z"/>
                    <polygon className="cls-1" points="150 210 150 150 210 150 150 210"/>

                    <line className="cls-2" x1="150" y1="300" x2="150" y2="5.295"/>
                    <polygon points="150 0 153.049 7.462 150 5.691 146.952 7.462 150 0"/>
                    <line className="cls-2" y1="150.052" x2="294.705" y2="149.95"/>
                    <polygon points="300 149.948 292.539 153 294.309 149.95 292.537 146.902 300 149.948"/>
                    <path className="cls-3" d="M90.02,150l-.02.02V150Z" transform="translate(0 0)"/>
                    <line className="cls-2" x1="210" y1="154" x2="210" y2="146"/>
                    <line className="cls-2" x1="154" y1="210" x2="146" y2="210"/>
                    <line className="cls-2" x1="154" y1="90" x2="146" y2="90"/>
                    <line className="cls-2" x1="90" y1="154" x2="90" y2="146"/>
                    <line className="cls-2" x1="154" y1="270" x2="146" y2="270"/>
                    <line className="cls-2" x1="270" y1="154" x2="270" y2="146"/>
                    <line className="cls-2" x1="154" y1="30" x2="146" y2="30"/>
                    <line className="cls-2" x1="30" y1="154" x2="30" y2="146"/>

                    <line id="frame-top" className="frame" x1={this.convertX(-3)} y1={this.convertY(3)}
                          x2={this.convertX(5)} y2={this.convertY(3)}/>
                    <line id="frame-bot" className="frame" x1={this.convertX(-3)} y1={this.convertY(-3)}
                          x2={this.convertX(5)} y2={this.convertY(-3)}/>
                    <line id="frame-left" className="frame" x1={this.convertX(-3)} y1={this.convertY(3)}
                          x2={this.convertX(-3)} y2={this.convertY(-3)}/>
                    <line id="frame-right" className="frame" x1={this.convertX(5)} y1={this.convertY(3)}
                          x2={this.convertX(5)} y2={this.convertY(-3)}/>

                    <text className="cls-4" transform="translate(30 143)">-
                        <tspan>{this.props.r}</tspan>
                    </text>
                    <text className="cls-4" transform="translate(154 267)">-
                        <tspan>{this.props.r}</tspan>
                    </text>
                    <text className="cls-4" transform="translate(263 143)">
                        <tspan>{this.props.r}</tspan>
                    </text>
                    <text className="cls-4" transform="translate(154 25)">
                        <tspan>{this.props.r}</tspan>
                    </text>
                    <text className="cls-4 divis" transform="translate(154 207)">-
                        <tspan>{this.props.r / 2}</tspan>
                    </text>
                    <text className="cls-4 divis" transform="translate(154 85)">
                        <tspan>{this.props.r / 2}</tspan>
                    </text>
                    <text className="cls-4 divis" transform="translate(210 143)">
                        <tspan>{this.props.r / 2}</tspan>
                    </text>
                    <text className="cls-4 divis" transform="translate(69 143)">-
                        <tspan>{this.props.r / 2}</tspan>
                    </text>
                    <text className="cls-5" transform="translate(158 13)">Y</text>
                    <text className="cls-5" transform="translate(289 143)">X</text>
                    {this.props.points.map(point => {
                        return (
                            <circle key={point.pointId} cx={this.convertX(point.x)} cy={this.convertY(point.y)} r="3"
                                    fill={point.inArea ? "#00ff00" : "#ff0000"}
                                    strokeWidth="1" stroke="black" id={point.pointId}
                                    fillOpacity={point.r === this.props.r ? "1" : "0.2"}
                                    strokeOpacity={point.r === this.props.r ? "1" : "0.5"}/>
                        );
                    })}
                </svg>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        isConnected: state.connectionReducer.isConnected,
        points: state.pointsReducer.points,
        r: state.pointsReducer.r
    }
};

export default connect(mapStateToProps, {addPoint, setConnection})(Plot);