// components/MyCloneBoard.js

import React from 'react';
import { Form, FormControl, Button, Modal, Row, Col } from 'react-bootstrap';
import Clone from './Clone';
const Loader = require('react-loader');

const MyCloneBoard = ({ openForm, closeForm, showForm, 
    myCloneBoardResults, handleSubmitNewClone, handleChangeTitle,
    handleChangeImgUrl, title, imgUrl, baseUrl, userName,
    handleLike, handleReClone, handleRemove, user,
    showUser, closeUser, usersClonesLoaded, usersClonesResults, openUser
}) => (
    <div style = {{ textAlign: 'center' }}>
        <Modal show = { showUser } onHide = { closeUser }>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Loader loaded = { usersClonesLoaded && usersClonesResults } >
                { usersClonesResults.length > 0
                        ? usersClonesResults.map((result) => <Clone
                            key = { result.userName + result.title }
                            userName = { result.userName }
                            user = { user }
                            title = { result.title }
                            imgUrl = { result.imgUrl }
                            likers = { result.likers }
                            cloners = { result.cloners }
                            handleLike = { handleLike }
                            handleReClone = { handleReClone }
                            baseUrl = { baseUrl }
                        />)
                        : null
                        
                } 
                </Loader>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick = { closeUser }>Close</Button>
            </Modal.Footer>
        </Modal>

        <Modal show = { showForm } onHide = { closeForm }>
            <Modal.Header closeButton>
                <Modal.Title>Create New Clone</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs = { 2 }>
                            <h4>Title</h4>
                        </Col>
                        <Col xs = { 10 }>
                            <FormControl
                                type = "text"
                                placeholder = "Kale Salad with Beans"
                                onChange = { handleChangeTitle } 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs = { 2 }>
                            <h4>Image Url</h4>
                        </Col>
                        <Col xs = { 10 }>
                            <FormControl
                                type = "text"
                                placeholder = "https://www.place.com/food.jpeg"
                                onChange = { handleChangeImgUrl } 
                            />
                        </Col>
                    </Row>
                </Form>
                <Button onClick = { (e) => handleSubmitNewClone(e, baseUrl, user, title, imgUrl ) }>Submit</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick = { closeForm }>Close</Button>
            </Modal.Footer>
        </Modal>
        { myCloneBoardResults.length > 0
                ? myCloneBoardResults.map((result) => <Clone 
                        key = { result.userName + result.title }
                        baseUrl = { baseUrl}
                        userName = { result.userName }
                        user = { user }
                        title = { result.title }
                        imgUrl = { result.imgUrl }
                        likers = { result.likers }
                        cloners = { result.cloners }
                        handleLike = { handleLike }
                        handleReClone = { handleReClone }
                        handleRemove = { handleRemove }
                        openUser = { openUser }
                    />)
                :null
        }
        <div> 
            <Button onClick = { (e) => openForm(e) }>
                Create New Clone
            </Button>
        </div>

    </div>
);

export default MyCloneBoard;
