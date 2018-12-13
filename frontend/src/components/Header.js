import React from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";

const Header = () => (
    <header className="App-header">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/main">Main</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
