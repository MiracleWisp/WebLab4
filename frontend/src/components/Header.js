import React, {Component} from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import axios from "axios";
import {signOut} from "../redux/actions";

class Header extends Component {
    signOut = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/logout',
            withCredentials: true
        }).then(
            () => {
                this.props.signOut();
            }
        ).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <header className="App-header">
                <div>
                    <nav>
                        <ul id='nav-list'>
                            <li>
                                <Button className="headerButton" component={Link} to="/">
                                    {this.props.isAuthenticated ? 'Профиль' : 'Войти'}
                                </Button>
                            </li>
                            {!this.props.isAuthenticated ? <li>
                                <Button className="headerButton" component={Link} to="/signup">Зарегистроваться</Button>
                            </li> : ''}
                            {this.props.isAuthenticated ? <li>
                                <Button className="headerButton" component={Link} to="/main">График</Button>
                            </li> : ''}
                            <li>
                                <Button className="headerButton"
                                        href="https://docs.google.com/spreadsheets/d/1_0q_h2O3rhopXSIHdteni_U8cN-to1BLEkMOgr_2zTE/edit#gid=2069076794&range=W14">О
                                    КОМПАНИИ</Button>
                            </li>
                            {this.props.isAuthenticated ? <li>
                                <Button className="headerButton" component={Link} to="/" onClick={this.signOut}>
                                    ВЫЙТИ
                                </Button>
                            </li> : ''}
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {signOut})(Header);
