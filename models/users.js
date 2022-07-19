const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    avatar: {
        type: String,
        unique: false,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('users', user);
