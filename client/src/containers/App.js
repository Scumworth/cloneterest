// containers/App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from './../actions';
import MyCloneBoardContainer from './MyCloneBoardContainer';
import RecentClonesContainer from './RecentClonesContainer';
import Header from './../components/Header';
import Footer from './../components/Footer';
import LandingPage from './../components/LandingPage';

const baseUrl = 'http://localhost:3001/api';

class App extends Component {
    render() {
        return (
            <div>
                <Header 
                    baseUrl = { baseUrl }
                    onSuccess = { this.props.onSuccess }
                    onFailure = { this.props.onFailure }
                    handleClick = { this.props.handleClick }
                />
                <Switch>
                    <Route exact path = "/" render = { () => <LandingPage /> } />
                    <Route path = "/mycloneboard" render = { () => <MyCloneBoardContainer /> } />
                    <Route path = "/recentclones" render = { () => <RecentClonesContainer /> } />
                </Switch>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { login } = state;
    const { isAuthenticated, user, token } = login;
    return { isAuthenticated, user, token }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSuccess: (response) => {
            const token = response.headers.get('x-auth-token');
            response.json().then((user) => {
                if(token) {
                    dispatch(login(user, token));
                }
            });
        },
        onFailure: (error) => {
            alert(error);
        },
        handleClick: (e, destination) => {
            console.log(destination);
            dispatch(push(destination));
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
