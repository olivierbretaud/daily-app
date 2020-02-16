const bcrypte = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput =require('../validation/login');

const User = require('../models/User');

exports.register = function(req, res ) {
    console.log(req.body)
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        console.log(req.body)
        return res.status(400).json(errors)
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user ) {
            return res.status(400).json({
                email: 'Email already exists'
            });
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
    const { errors,  isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email ='User not found'
                return res.status(404).json(errors);
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
                                    token: `Breaer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password ='Incorrect Password';
                        return res.status(400).json(errors);
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
