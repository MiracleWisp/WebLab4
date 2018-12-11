import React from 'react';
import logo from '../assets/plot.svg';
import '../styles/App.css';
import {Link} from "react-router-dom";

const Header = () => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/main">Main</Link>
                </li>
                <li>
                    <Link to="/login">LogIn</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
