import React from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'

const Header = (props) => {
  return (
      <header className="App-header">
        <div>
          <nav>
            <ul id='nav-list'>
              <li>
                <Button component={Link} to="/">
                  {props.isAuthenticated ? 'Профиль' : 'Войти'}
                </Button>
              </li>
              {props.isAuthenticated ? <li>
                <Button component={Link} to="/main">График</Button>
              </li> : ''}
            </ul>
          </nav>
        </div>
      </header>
  )
};

export default connect((state) => ({isAuthenticated: state.authReducer.isAuthenticated}))(Header);
