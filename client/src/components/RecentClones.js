// components/RecentClones.js

import React from 'react';
import Clone from './Clone';

const RecentClones = ( { recentClonesResults, handleLike, handleReClone,
    handleRemove, user, baseUrl }) => (
    <div style = {{ textAlign: 'center' }}>
        { recentClonesResults.length > 0
                ? recentClonesResults.map((result) => <Clone
                    key = { result.userName + result.title }
                    userName = { result.userName }
                    user = { user }
                    title = { result.title }
                    imgUrl = { result.imgUrl }
                    likers = { result.likers }
                    cloners = { result.cloners }
                    handleLike = { handleLike }
                    handleReClone = { handleReClone }
                    handleRemove = { handleRemove }
                    baseUrl = { baseUrl }
                />)
                : null
        }
    </div>
);

export default RecentClones;
