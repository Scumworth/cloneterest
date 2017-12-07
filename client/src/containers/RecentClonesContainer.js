// containers/RecentClonesContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentClones from './../components/RecentClones';
import { getRecentClones } from './../actions';
const Loader = require('react-loader');

class RecentClonesContainer extends Component {
    componentDidMount() {
        this.props.getRecentClones(this.props.baseUrl);
    }
    render() {
        return (
            <div>
                <Loader loaded = { this.props.recentClonesLoaded }>
                    <RecentClones 
                        recentClonesResults = { this.props.recentClonesResults } 
                        usersClonesResults = { this.props.usersClonesResults }
                        handleLike = { this.props.handleLike }
                        handleReClone = { this.props.handleReClone } 
                        handleRemove = { this.props.handleRemove }
                        user = { this.props.user }
                        baseUrl = { this.props.baseUrl }
                        showUser = { this.props.showUser }
                        closeUser = { this.props.closeUser }
                        openUser = { this.props.openUser }
                        usersClonesLoaded = { this.props.usersClonesLoaded }
                    />
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { recentClones, usersClones, userBoard } = state;
    const { recentClonesLoaded, isFetchingRecentClones, recentClonesResults } = recentClones;
    const { usersClonesLoaded, isFetchingUsersClones, usersClonesResults } = usersClones;
    const { showUser } = userBoard;
    return { recentClonesLoaded, isFetchingRecentClones, recentClonesResults,
        usersClonesLoaded, isFetchingUsersClones, usersClonesResults,
        showUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecentClones: (baseUrl) => {
            dispatch(getRecentClones(baseUrl));
        },        
        dispatch
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentClonesContainer);
