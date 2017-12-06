// actions/index.js

import axios from 'axios';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_RECENT_CLONES = 'REQUEST_RECENT_CLONES';
export const RECEIVE_RECENT_CLONES = 'RECEIVE_RECENT_CLONES';
export const REQUEST_MY_CLONE_BOARD = 'REQUEST_MY_CLONE_BOARD';
export const RECEIVE_MY_CLONE_BOARD = 'RECEIVE_MY_CLONE_BOARD';
export const OPEN_FORM = 'OPEN_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const SELECT_TITLE = 'SELECT_TITLE';
export const SELECT_IMG_URL = 'SELECT_IMG_URL';

export const login = (user, token) => ({
    type: LOGIN_USER,
    user,
    token
});

export const logout = () => ({
    type: LOGOUT_USER    
});

export const openForm = () => ({
    type: OPEN_FORM
});

export const closeForm = () => ({
    type: CLOSE_FORM
});

export const selectTitle = (title) => ({
    type: SELECT_TITLE,
    title
});

export const selectImgUrl = (imgUrl) => ({
    type: SELECT_IMG_URL,
    imgUrl
});

export const requestRecentClones = () => ({
    type: REQUEST_RECENT_CLONES
});

export const receiveRecentClones = (data) => ({
    type: RECEIVE_RECENT_CLONES,
    recentClonesResults: data.map((clone) => ({...clone}))
});

export const getRecentClones = (baseUrl) => dispatch => {
    dispatch(requestRecentClones);
    axios.get(`${baseUrl}/clones`)
        .then((res) => {
            return res.data;
        }, (e) => console.log(e))
        .then((data) => {
            dispatch(receiveRecentClones(data));
        });
}

export const requestMyCloneBoard = () => ({
    type: REQUEST_MY_CLONE_BOARD
});

export const receiveMyCloneBoard = (data) => ({
    type: RECEIVE_MY_CLONE_BOARD,
    myCloneBoardResults: data.map((clone) => ({...clone}))
});

export const getMyCloneBoard = (baseUrl, userName) => dispatch => {
    dispatch(requestMyCloneBoard);
    axios.get(`${baseUrl}/mycloneboard`, {
        params: { userName: userName }
    })
        .then((res) => {
            return res.data;
        }, (e) => console.log(e))
        .then((data) => {
            dispatch(receiveMyCloneBoard(data));
        });
}
