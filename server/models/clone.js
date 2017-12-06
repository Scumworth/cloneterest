// models/clone.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CloneSchema = new Schema({
    imgUrl: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    title: { type: String, required: true },
    likers: [{ type: String }],
    cloners: [{ type: String }]
})

const Clone = mongoose.model('Clone', CloneSchema);

module.exports = { Clone };
