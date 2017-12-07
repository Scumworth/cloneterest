// containers/MyCloneBoardContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyCloneBoard from './../components/MyCloneBoard';
import { getMyCloneBoard, openForm, closeForm, selectImgUrl, selectTitle } from './../actions';
import axios from 'axios';
const Loader = require('react-loader');

class MyCloneBoardContainer extends Component {
    componentDidMount() {
        this.props.getMyCloneBoard(this.props.baseUrl, this.props.user);
    }
    render() {
        return (
            <div>
                <Loader loaded = { this.props.myCloneBoardLoaded }>
                    <MyCloneBoard 
                        title = { this.props.title }
                        imgUrl = { this.props.imgUrl } 
                        myCloneBoardResults = { this.props.myCloneBoardResults }
                        showForm = { this.props.showForm }
                        openForm = { this.props.handleOpenForm }
                        closeForm = { this.props.closeForm }
                        handleChangeImgUrl = { this.props.handleChangeImgUrl }
                        handleChangeTitle = { this.props.handleChangeTitle }
                        handleSubmitNewClone = { this.props.handleSubmitNewClone }
                        baseUrl = { this.props.baseUrl }
                        user = { this.props.user }
                        handleLike = { this.props.handleLike }
                        handleReClone = { this.props.handleReClone }
                        handleRemove = { this.props.handleRemove }
                        openUser = { this.props.openUser }
                        closeUser = { this.props.closeUser }
                        showUser = { this.props.showUser }
                        usersClonesLoaded = { this.props.usersClonesLoaded }
                        usersClonesResults = { this.props.usersClonesResults }
                    />
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { myCloneBoard, form } = state;
    const { myCloneBoardLoaded, isFetchingMyCloneBoard, myCloneBoardResults } = myCloneBoard;
    const { showForm, title, imgUrl } = form;
    return { myCloneBoardLoaded, isFetchingMyCloneBoard, 
        myCloneBoardResults, showForm, title, imgUrl };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyCloneBoard: (baseUrl, userName) => {
            dispatch(getMyCloneBoard(baseUrl, userName));      
        },
        handleSubmitNewClone: (e, baseUrl, user, title, imgUrl) => {
            e.preventDefault();
            axios.post(`${baseUrl}/clones`, {
                userName: user,
                title, 
                imgUrl
            })
                .then((response) => {
                    console.log(response);
                    dispatch(getMyCloneBoard(baseUrl, user));
                }, (e) => console.log(e))
        },
        handleOpenForm: (e) => {
            e.preventDefault();
            dispatch(openForm());
        },
        closeForm: () => {
            dispatch(closeForm());
        },
        handleChangeImgUrl: (e) => {
            e.preventDefault();
            const target = e.target;
            const value = target.value;
            dispatch(selectImgUrl(value)); 
        },
        handleChangeTitle: (e) => {
            e.preventDefault();
            const target = e.target;
            const value = target.value;
            dispatch(selectTitle(value));
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCloneBoardContainer);
