const User = require('../Models/user');

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

function authentication(userid, username) {
    return jwt.sign({ userid, username }, process.env.SECRET_KEY);
}

exports.userLogin = (req, res) => {
    try {
        const { useremail, userpassword } = req.body;
        User.findOne({ useremail: useremail })
        .then((response) => {
            if(!response) {
                throw new Error("user not found");
            }
            bcrypt.compare(userpassword, response.userpassword, (err, result) => {
                if(result) {
                    res.status(200).json({success: true, message: 'user logged in successfully', token: authentication(response._id, response.username)});
                } else {
                    res.status(400).json({success: false, message: 'password missmatch'});
                }
            })
        })
        .catch((err) => {
            res.status(400).json({success: false, message: err.message});
        })
    } catch(err) {
        res.status(500).json({success: false, message: 'login failed'});
    } 
}

exports.userSingnup = (req, res) => {
    try {
        const { username, useremail, userphone, userpassword } = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(userpassword, salt, (err, hash) => {
                User.create({
                    username: username, userphone: userphone, useremail: useremail, userpassword: hash
                })
                .then((result) => {
                    res.status(200).json({success: true, message: 'user created'});
                })
                .catch((err) => {
                    res.status(400).json({success: false, message: 'user creation failed'});
                });
            });
        });
    } catch(err) {
        res.status(500).json({success: false, message: 'user creation failed'});
    }
    
}