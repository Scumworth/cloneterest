// components/RecentClones.js

import React from 'react';
import Clone from './Clone';
import { Modal, Button } from 'react-bootstrap';

const RecentClones = ( { recentClonesResults, handleLike, handleReClone,
    handleRemove, user, baseUrl, usersClonesResults, showUser, closeUser,
    openUser }) => (
    <div style = {{ textAlign: 'center' }}>
        <Modal show = { showUser } onHide = { closeUser }>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick = { closeUser }>Close</Button>
            </Modal.Footer>
        </Modal>
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
                    openUser = { openUser }
                />)
                : null
        }
    </div>
);

export default RecentClones;
