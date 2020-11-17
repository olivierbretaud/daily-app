const bcrypte = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const { transporter , getPasswordResetURL , resetPasswordTemplate } = require('../modules/email')

//TODO forgot password email error

const passwordHashToToken = ({
    password: passwordHash,
    _id: userId,
    createdAt
  }) => {
  
    const secret = passwordHash + "-" + createdAt
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600 // 1 hour
    })
  
    return token
  
  }


const User = require('../models/User');

exports.register = (req, res ) => {

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
                lastName: req.body.lastName,
                firstName: req.body.firstName,
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
                                    res.status(201).json(user)
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
                            _id: user._id,
                            firstName: user.firstName,
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

exports.profile = (req, res ) => {
    return res.json({
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        isAdmin :req.user.isAdmin
    });
};

exports.sendResetPassordEmail = ( req , res ) => {
    const email = req.body.email;
    try {
        User.findOne({email}).then(user => {
            const token = passwordHashToToken(user);
            const url = getPasswordResetURL(user , token );
            const emailTemplate = resetPasswordTemplate(user , url );
        
            const sendMail = () => {
                transporter.sendMail(emailTemplate , (err , info ) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json("error sending email")
                    }
                    if(info) {
                        res.status(200).json({
                            token : token,
                            message:"Check your email to reset your password"
                        });
                    }

                })
            }
        
            sendMail();
        });

    } catch (err) {
        res.status(404).json("No user with that email");
    }

};

exports.resetPassword = (req , res ) => {
    const { token , _id , password } = req.body;

    User.findOne({ _id })
        .then(user => {

        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret);

        if (payload.userId === _id) {
    
            bcrypte.genSalt(10, function(err, salt) {
    
            // Call error-handling middleware:
            if (err) return;
    
            bcrypte.hash(password, salt, function(err, hash) {
    
                // Call error-handling middleware:
                if (err) return;

                User.findOneAndUpdate({ _id }, { password: hash })
                    .then(() => res.status(202).json("Password changed accepted"))
                    .catch(err => res.status(500).json(err))
    
                })
    
            })}
          
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json("Invalid user")
        })
};
