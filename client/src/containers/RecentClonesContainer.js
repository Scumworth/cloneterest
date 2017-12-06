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
                        handleLike = { this.props.handleLike }
                        handleReClone = { this.props.handleReClone } 
                        handleRemove = { this.props.handleRemove }
                        user = { this.props.user }
                        baseUrl = { this.props.baseUrl }
                    />
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { recentClones } = state;
    const { recentClonesLoaded, isFetchingRecentClones, recentClonesResults } = recentClones;
    return { recentClonesLoaded, isFetchingRecentClones, recentClonesResults };
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
