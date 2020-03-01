const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let error = null ;
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = ! isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        error = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        error  = 'Email is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30 })) {
        error = 'Password must have 6 chars';
    }

    if (Validator.isEmpty(data.password)) {
        error = 'Password is required';
    }

    return {
        error,
        isValid: isEmpty(error)
    }
}