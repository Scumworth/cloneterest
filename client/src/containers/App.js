// containers/App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, getMyCloneBoard, getRecentClones, logout } from './../actions';
import MyCloneBoardContainer from './MyCloneBoardContainer';
import RecentClonesContainer from './RecentClonesContainer';
import Header from './../components/Header';
import Footer from './../components/Footer';
import LandingPage from './../components/LandingPage';
import axios from 'axios';

const baseUrl = 'https://sheltered-gorge-20702.herokuapp.com/api';

class App extends Component {
    render() {
        return (
            <div>
                <Header 
                    baseUrl = { baseUrl }
                    isAuthenticated = { this.props.isAuthenticated } 
                    onSuccess = { this.props.onSuccess }
                    onFailure = { this.props.onFailure }
                    handleClick = { this.props.handleClick }
                    logout = { this.props.logout }
                />
                <Switch>
                    <Route exact path = "/" render = { () => <LandingPage /> } />
                    <Route path = "/mycloneboard" render = { () => 
                        <MyCloneBoardContainer 
                            user = { this.props.user }
                            baseUrl = { baseUrl }
                            handleLike = { this.props.handleLike } 
                            handleReClone = { this.props.handleReClone }
                            handleRemove = { this.props.handleRemove }
                         /> } />
                    <Route path = "/recentclones" render = { () => 
                        <RecentClonesContainer  
                            user = { this.props.user } 
                            baseUrl = { baseUrl } 
                            handleLike = { this.props.handleLike }
                            handleReClone = { this.props.handleReClone }
                            handleRemove = { this.props.handleRemove }
                        /> } />
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
            e.preventDefault();
            dispatch(push(destination));
        },
        handleLike: (e, user, userName, baseUrl, imgUrl, likers) => {
            e.preventDefault();
            console.log('handleLike');    
            axios.patch(`${baseUrl}/likes`, {
                imgUrl,
                user
            })
                .then((response) => {
                    dispatch(getRecentClones(baseUrl));
                    dispatch(getMyCloneBoard(baseUrl, user));
                }, (e) => console.log(e))
        },
        handleReClone: (e, user, userName, baseUrl, imgUrl, cloners) => {
            e.preventDefault();
            console.log('handleReClone');
            if (user !== userName) {
                axios.patch(`${baseUrl}/clones`, {
                    imgUrl,
                    user
                })
                    .then((response) => {
                        dispatch(getRecentClones(baseUrl));
                        dispatch(getMyCloneBoard(baseUrl, user));
                    }, (e) => console.log(e))
            }
        },
        handleRemove: (e, user, userName, baseUrl, imgUrl, cloners) => {
            e.preventDefault();
            if (user === userName ) {
                axios.delete(`${baseUrl}/clones`, { params: { imgUrl: imgUrl } })
                    .then((response) => {
                        console.log('Logged in user matches clone creator (userName) so clone deleted')
                        dispatch(getRecentClones(baseUrl));
                        dispatch(getMyCloneBoard(baseUrl, user));
                    }, (e) => console.log(e))
            }
            else if (cloners.indexOf(user) !== -1) {
                axios.patch(`${baseUrl}/clones`, {
                    imgUrl,
                    user
                })
                    .then((response) => {
                        console.log('Logged in user is a cloner, so he has been removed from cloner array')
                        dispatch(getRecentClones(baseUrl));
                        dispatch(getMyCloneBoard(baseUrl, user));
                    }, (e) => console.log(e))
            }
        },
        logout: (e) => {
            e.preventDefault();
            dispatch(logout());
            dispatch(push('/'));
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
