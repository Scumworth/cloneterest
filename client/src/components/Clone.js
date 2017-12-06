// components/Clone.js

import React from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

const Clone = ({ user, userName, title, imgUrl, likers, cloners, handleLike,
    handleReClone, handleRemove, baseUrl }) => (
        <div style = {{ 
            maxWidth: 750, 
            minWidth: 250, 
            display: 'inline-block', 
            backgroundColor: 'lightGray', 
            borderRadius: 10, 
            margin: 10,
            padding: 10
        }}>
            <Row>
                <Col xs = { 10 }> 
                    <h5 style = {{textAlign: 'left'}}> { title } </h5> 
                </Col>
                <Col xs = { 2 }> 
                    <div onClick = { (e) =>  handleRemove(e, user, userName, baseUrl, imgUrl, cloners) }>
                        <FontAwesome name = "times" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Image src = { imgUrl } responsive />
            </Row>
            <Row>
                <Col xs = { 6 }>
                    <Button onClick = { (e) => handleLike(e, user, userName, baseUrl, imgUrl, likers) }>
                        <FontAwesome name = "thumbs-up" /> { likers.length }
                    </Button>
                </Col>
                <Col xs = { 6 }>
                    <Button onClick = { (e) => handleReClone(e, user, userName, baseUrl, imgUrl, cloners) }>
                        <FontAwesome name = "share" /> { cloners.length }
                    </Button>
                </Col>
            </Row>
    </div>
);

export default Clone;
