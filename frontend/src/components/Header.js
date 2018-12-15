import React from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

const Header = (props) => {
    return (
        <header className="App-header">
            <div>
                <nav>
                    <ul id='nav-list'>
                        <li>
                            <Link to="/">{props.isAuthenticated ? 'Профиль' : 'Войти'}</Link>
                        </li>
                        {props.isAuthenticated ? <li>
                            <Link to="/main">График</Link>
                        </li> : ''}
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(Header);
