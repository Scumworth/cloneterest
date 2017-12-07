// components/Header.js

import React from 'react';
import { Jumbotron, Navbar, Nav, NavItem } from 'react-bootstrap';
import TwitterLogin from 'react-twitter-auth';

const Header =  ( { onSuccess, onFailure, logout, handleClick, isAuthenticated }) => (
    <div>
        <Navbar>
            <Nav bsStyle = "pills">
                <NavItem onClick = { (e) => handleClick(e, '/') }>Home</NavItem>
                { isAuthenticated 
                        ?<NavItem onClick = { (e) => handleClick(e, '/mycloneboard') }>MyCloneBoard</NavItem>
                        : null
                }
                <NavItem onClick = { (e) => handleClick(e, '/recentclones') }>Recent Clones</NavItem>
                { !isAuthenticated
                        ? <NavItem>
                        <TwitterLogin 
                            loginUrl = "https://cloneterestapp.herokuapp.com/api/auth/twitter"
                            onSuccess = { onSuccess } 
                            onFailure = { onFailure }
                            requestTokenUrl = "https://cloneterestapp.herokuapp.com/api/auth/twitter/reverse"
                        />
                        </NavItem>
                        : <NavItem onClick = { (e) => logout(e) }>Logout</NavItem>
                }
            </Nav>
        </Navbar>
        <Jumbotron style = {{ textAlign: 'center' }}>
            <h1>Cloneterest</h1>
            <p>A Pinterest Clone App built for FreeCodeCamp</p>
        </Jumbotron>
    </div>
);

export default Header;
