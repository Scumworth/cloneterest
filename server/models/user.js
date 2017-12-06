// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    twitterProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
});

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    const that = this;
    return this.findOne({
        'twitterProvider.id': profile.id
    }, (err, user) => {
        if (!user) {
            const newUser = new that({
                email: profile.emails[0].value,
                twitterProvider: {
                    id: profile.id,
                    token,
                    tokenSecret
                }
            });
                
    newUser.save((error, savedUser) => {
        if (error) {
            console.log(error);
        }
        return cb(error, savedUser);
    });
        }
        else {
            return cb(err, user);
        }
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };
