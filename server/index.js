// server/index.js
'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
const { mongoose } = require('./db/mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const PORT = process.env.PORT || 3001;
const { User } = require('./models/user');
const { Clone } = require('./models/clone');
const passportConfig = require('./passport');

passportConfig();

const corsOption = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.json({ message: 'API Initialized' });
});

const createToken = (auth) => {
    return jwt.sign({
        id: auth.id
        // change my-secret below in production
    }, process.env.DEVELOPMENT_JWT_SECRET, {
        expiresIn: 60 * 120
    });
};

const generateToken = (req, res, next) => {
    req.token = createToken(req.auth);
    return next();
};

const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

// token handling middleware
const authenticate = expressJwt({
    //change my-secret belown in production!!! 
    secret: process.env.DEVELOPMENT_JWT_SECRET,
    requestProperty: 'auth',
    getToken: (req) => {
        if(req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

const getCurrentUser = (req, res, next) => {
    User.findById(req.auth.id, (err, user) => {
        if(err) {
            next(err)
        }
        else {
            req.user = user;
            next();
        }
    });
};

const getOne = (req, res) => {
    const user = req.user.toObject();
    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};

router.route('/auth/me')
    .get(authenticate, getCurrentUser, getOne);


router.route('/auth/twitter/reverse')
    .post((req, res) => {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                outh_callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback',
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET
            }
        }, (err, r, body) => {
            if(err) {
                return res.send(500, { message: err.message });
            }
        const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
        });
    });

router.route('/auth/twitter')
    .post((req, res, next) => {
        request.post({
            url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
            oauth: {
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function(err, r, body) {
            if(err) {
                return res.send(500, { message: err.message });
            }
            console.log(body)
            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);
            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;
            next();
        });
    }, passport.authenticate('twitter-token', { session: false }), (req, res, next) => {
        if(!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };
        return next();
    }, generateToken, sendToken);

router.route('/clones')
    .get((req, res) => {
        Clone.find({}).then((clones) => {
            res.json(clones);
        }, (e) => {
            res.status(400).send(e);
        });
    })
    .post((req, res) => {
        const clone = new Clone({
            userName: req.body.userName,
            title: req.body.title,
            imgUrl: req.body.imgUrl,
            cloners: [],
            likers: []
        })
        clone.save().then((clone) => {
            res.send({ message: 'New Clone Saved! '});
        }, (e) => {
            res.status(400).send(e);
        });
    })
    .patch((req, res) => {
        Clone.findOne({ imgUrl: req.body.imgUrl }).then((clone) => {
            if (clone && clone.cloners.indexOf(req.body.user) === -1) {
                Clone.findOneAndUpdate(
                    { imgUrl: req.body.imgUrl },
                    { $set: { cloners: clone.cloners.concat([req.body.user]) } }
                ).then(() => {
                    res.send({ message: 'user has been added as cloner to clone.' })
                }, (e) => res.status(400).send(e));
            } 
            else if (clone && clone.cloners.indexOf(req.body.user) !== -1) {
                Clone.findOneAndUpdate(
                    { imgUrl: req.body.imgUrl },
                    { $set: { cloners: clone.cloners.filter((cloner) => cloner !== req.body.user) } },
                    { new: true }
                ).then(() => {
                    res.send({ message: 'user has been removed as cloner from clone' })
                }, (e) => res.status(400).send(e));
            }
        })
    })
    .delete((req, res) => {
        Clone.remove({ imgUrl: req.query.imgUrl })
            .then((request) => {
                console.log('Clone removed');
                res.send({ message: 'Clone deleted'});
            }, (e) => res.status(400).send(e))
    })

router.route('/likes')
    .patch((req, res) => {
        Clone.findOne({ imgUrl: req.body.imgUrl }).then((clone) => {
            if (clone && clone.likers.indexOf(req.body.user) === -1) {
                Clone.findOneAndUpdate(
                    { imgUrl: req.body.imgUrl },
                    { $set: { likers: clone.likers.concat([req.body.user]) } }
                ).then(() => {
                    res.send({ message: 'user has been added as liker to clone.' })
                }, (e) => res.status(400).send(e));
            }
            else if (clone && clone.likers.indexOf(req.body.user) !== -1) {
                Clone.findOneAndUpdate(
                    { imgUrl: req.body.imgUrl },
                    { $set: { likers: clone.likers.filter((liker) => liker !== req.body.user) } },
                    { new: true }
                ).then(() => {
                    res.send({ message: 'user has been removed as liker from clone.'})
                }, (e) => res.status(400).send(e))
            }
        })
    })
router.route('/mycloneboard')
    .get((req, res) => {
        const myCloneBoard = [];
        const userName = req.query.userName;
        Clone.find({}).then((clones) => {
            for (let i = 0; i < clones.length; i++) {
                if (clones[i].userName === req.query.userName || clones[i].cloners.indexOf(req.query.userName !== -1)){
                    myCloneBoard.push(clones[i]);
                }
            }
            res.send(myCloneBoard);
            //filter clones for clones that belong on my cloneboard and push
        }, (e) => {
            res.status(400).send(e);
        })
    })


app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
})
