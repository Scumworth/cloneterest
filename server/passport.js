'use strict';

const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const { User } = require('./models/user');

module.exports = function() {
    passport.use(new TwitterTokenStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        includeEmail: true
    },
        function(token, tokenSecret, profile, done) {
            User.upsertTwitterUser(token, tokenSecret, profile, (err, user) => {
                return done(err, user);
            });
        }
    ));
};
