const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let error = null
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if (!Validator.isLength(data.name, {min: 2, max: 30 })) {
        error = 'Name must be between 2 to 30 chars';
    
    }

    if (Validator.isEmpty(data.name) ) {
        error = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
        error = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        error = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        error = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        error = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        error = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        error = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        error = 'Password is required';
    }

    return {
        error,
        isValid: isEmpty(error)
    }

}