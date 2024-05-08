const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userphone: {
        type: Number,
        required: true,
        unique: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', userSchema);