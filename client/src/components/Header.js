// components/Header.js

import React from 'react';
import { Jumbotron, Navbar, Nav, NavItem } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

const Header = () => (
    <div>
        <Navbar>
            <Nav bsStyle = "pills">
                <NavItem>Home</NavItem>
                <NavItem></NavItem>
            </Nav>
        </Navbar>
        <Jumbotron style = {{ textAlign: 'center' }}>
            <h1>Cloneterest</h1>
            <p>A Pinterest Clone App built for FreeCodeCamp</p>
        </Jumbotron>
    </div>
);

export default Header;
