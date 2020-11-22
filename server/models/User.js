const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;