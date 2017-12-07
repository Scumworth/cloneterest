// components/Clone.js

import React from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

const Clone = ({ user, userName, title, imgUrl, likers, cloners, handleLike,
    handleReClone, handleRemove, baseUrl }) => (
        <div style = {{ 
            width: 300,
            display: 'inline-block', 
            backgroundColor: 'lightGray', 
            borderRadius: 10, 
            margin: 10,
            padding: 10
        }}>
            <Row>
                <Col xs = { 10 }> 
                    <h3 style = {{ textAlign: 'left' }}> { title } </h3> 
                </Col>
                <Col xs = { 2 }> 
                    <div onClick = { (e) =>  handleRemove(e, user, userName, baseUrl, imgUrl, cloners) }>
                        <FontAwesome name = "times" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs = { 1 }></Col>
                <Col xs = { 10 }>
                    <Image width = "100%" src = { imgUrl }  onError = { (e) => e.target.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Camera.svg/744px-Camera.svg.png") } responsive />
                </Col>
                <Col xs = { 1 }></Col>
            </Row>
            <Row>
                <Col xs = { 6 }>
                    <p style = {{ fontSize: 8 }}> { userName } </p>
                </Col>
                <Col xs = { 3 }>
                    <Button onClick = { (e) => handleLike(e, user, userName, baseUrl, imgUrl, likers) }>
                        <FontAwesome name = "thumbs-up" /> { likers.length }
                    </Button>
                </Col>
                <Col xs = { 3 }>
                    <Button onClick = { (e) => handleReClone(e, user, userName, baseUrl, imgUrl, cloners) }>
                        <FontAwesome name = "share" /> { cloners.length }
                    </Button>
                </Col>
            </Row>
    </div>
);

export default Clone;
