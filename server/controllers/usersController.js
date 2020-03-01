const bcrypte = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput =require('../validation/login');

const User = require('../models/User');

exports.register = function(req, res ) {

    const { error, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        console.log(req.body, error)
        return res.status(400).json(error)
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user ) {
            return res.status(400).json('Email already exists');
        } else { 
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password:  req.body.password,
                isAdmin : false
            });

            bcrypte.genSalt(10, (err, salt) => {
                if (err) console.error('there was an error', err );
                else {
                    bcrypte.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('there was an error', err );
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
};

exports.login = (req, res) => {
    var { error,  isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                error ='User not found'
                return res.status(404).json(error);
            }
            bcrypte.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('there is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: token
                                });
                            }
                        });
                    } else {
                        error ='Incorrect Password';
                        return res.status(400).json(error);
                    }
                });
        });
};

exports.me = (req, res ) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        isAdmin :req.user.isAdmin
    });
};
