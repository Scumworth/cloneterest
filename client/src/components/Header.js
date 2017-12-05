// components/Header.js

import React from 'react';
import { Jumbotron, Navbar, Nav, NavItem } from 'react-bootstrap';
import TwitterLogin from 'react-twitter-auth';

const Header =  ( { onSuccess, onFailure, logOut, handleClick }) => (
    <div>
        <Navbar>
            <Nav bsStyle = "pills">
                <NavItem onClick = { (e) => handleClick(e, '/') }>Home</NavItem>
                <NavItem onClick = { (e) => handleClick(e, '/mycloneboard') }>MyCloneBoard</NavItem>
                <NavItem onClick = { (e) => handleClick(e, '/recentclones') }>Recent Clones</NavItem>
                <NavItem>
                    <TwitterLogin 
                        loginUrl = "http://localhost:3001/api/auth/twitter"
                        onSuccess = { onSuccess } 
                        onFailure = { onFailure }
                        requestTokenUrl = "http://localhost:3001/api/auth/twitter/reverse"
                    />
                </NavItem>
            </Nav>
        </Navbar>
        <Jumbotron style = {{ textAlign: 'center' }}>
            <h1>Cloneterest</h1>
            <p>A Pinterest Clone App built for FreeCodeCamp</p>
        </Jumbotron>
    </div>
);

export default Header;
