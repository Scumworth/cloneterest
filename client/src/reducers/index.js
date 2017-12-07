// reducers/index.js

import {
    OPEN_USER,
    CLOSE_USER,
    LOGIN_USER, 
    LOGOUT_USER,
    OPEN_FORM,
    CLOSE_FORM,
    REQUEST_USERS_CLONES,
    RECEIVE_USERS_CLONES,
    REQUEST_RECENT_CLONES,
    RECEIVE_RECENT_CLONES,
    REQUEST_MY_CLONE_BOARD,
    RECEIVE_MY_CLONE_BOARD,
    SELECT_TITLE,
    SELECT_IMG_URL
} from '../actions';

export const login = (state = {
    isAuthenticated: false,
    user: null,
    token: ''
}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user.email,
                token: action.token
            }
        case LOGOUT_USER: 
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: ''
            }
        default:
            return state;
    }
}

export const form = (state = {
    showForm: false,
    title: null,
    imgUrl: null
}, action) => {
    switch (action.type) {
        case OPEN_FORM:
            return {
                ...state,
                showForm: true
            }
        case CLOSE_FORM:
            return {
                ...state,
                showForm: false
            }
        case SELECT_TITLE:
            return {
                ...state,
                title: action.title
            }
        case SELECT_IMG_URL:
            return {
                ...state,
                imgUrl: action.imgUrl
            }
        default:
            return state;
    }
}

export const userBoard = (state = {
    showUser: false,
}, action) => {
    switch (action.type) {
        case OPEN_USER:
            return {
                ...state,
                showUser: true
            }
        case CLOSE_USER:
            return {
                ...state,
                showUser: false
            }
        default:
            return state;
    }
}

export const recentClones = (state = {
    recentClonesLoaded: false,
    isFetchingRecentClones: false,
    recentClonesResults: []
}, action) => {
    switch (action.type) {
        case REQUEST_RECENT_CLONES:
            return {
                ...state,
                isFetchingRecentClones: true
            }
        case RECEIVE_RECENT_CLONES:
            return {
                ...state,
                isFetchingRecentClones: false,
                recentClonesLoaded: true,
                recentClonesResults: action.recentClonesResults
            }
         default:
            return state;
    }
}

export const usersClones = (state = {
    usersClonesLoaded: false,
    isFetchingUsersClones: false,
    usersClonesResults: []
}, action) => {
    switch (action.type) {
        case REQUEST_USERS_CLONES:
            return {
                ...state,
                isFetchingUsersClones: true
            }
        case RECEIVE_USERS_CLONES:
            return {
                ...state,
                isFetchingUsersClones: false,
                usersClonesLoaded: true,
                usersClonesResults: action.usersClonesResults
            }
        default:
            return state;
    }
}

export const myCloneBoard = (state = {
    myCloneBoardLoaded: false,
    isFetchingMyCloneBoard: false,
    myCloneBoardResults: []
}, action) => {
    switch (action.type) {
        case REQUEST_MY_CLONE_BOARD:
            return {
                ...state,
                isFetchingMyCloneBoard: true
            }
        case RECEIVE_MY_CLONE_BOARD:
            return {
                ...state,
                isFetchingMyCloneBoard: false,
                myCloneBoardLoaded: true,
                myCloneBoardResults: action.myCloneBoardResults
            }
        default: 
            return state;
    }
}
