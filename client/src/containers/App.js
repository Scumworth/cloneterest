// containers/App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, getMyCloneBoard, getRecentClones, getUsersClones, openUser, closeUser, logout } from './../actions';
import MyCloneBoardContainer from './MyCloneBoardContainer';
import RecentClonesContainer from './RecentClonesContainer';
import Header from './../components/Header';
import Footer from './../components/Footer';
import LandingPage from './../components/LandingPage';
import axios from 'axios';

const baseUrl = 'https://cloneterestapp.herokuapp.com/api';

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
                            openUser = { this.props.openUser }
                            closeUser = { this.props.closeUser }
                            baseUrl = { baseUrl }
                            handleLike = { this.props.handleLike } 
                            handleReClone = { this.props.handleReClone }
                            handleRemove = { this.props.handleRemove }
                            showUser = { this.props.showUser }
                            usersClonesLoaded = { this.props.usersClonesLoaded }
                            usersClonesResults = { this.props.usersClonesResults }

                         /> } />
                    <Route path = "/recentclones" render = { () => 
                        <RecentClonesContainer  
                            user = { this.props.user } 
                            baseUrl = { baseUrl } 
                            openUser = { this.props.openUser }
                            closeUser = { this.props.closeUser }
                            handleLike = { this.props.handleLike }
                            handleReClone = { this.props.handleReClone }
                            handleRemove = { this.props.handleRemove }
                            showUser = { this.props.showUser }
                            usersClonesLoaded = { this.props.usersClonesLoaded }
                            usersClonesResults = { this.props.usersClonesResults }
                        /> } />
                </Switch>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { login, userBoard, usersClones } = state;
    const { usersClonesLoaded, isFetchingUsersClones, usersClonesResults } = usersClones;
    const { showUser } = userBoard
    const { isAuthenticated, user, token } = login;
    return { isAuthenticated, user, token, usersClonesLoaded, isFetchingUsersClones, 
    usersClonesResults, showUser }
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
                    dispatch(getUsersClones(baseUrl, userName));
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
                        dispatch(getUsersClones(baseUrl, userName));
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
        openUser: (e, baseUrl, userName) => {
            e.preventDefault();
            dispatch (getUsersClones(baseUrl, userName)); 
            dispatch(openUser());
        },
        closeUser: () => {
            dispatch(closeUser());
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
