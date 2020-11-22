const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let error = null
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    if (!Validator.isLength(data.lastName , {min: 2, max: 30 })) {
        error = 'Last name must be between 2 to 30 chars';
    }

    if (!Validator.isLength(data.firstName , {min: 2, max: 30 })) {
        error = 'First name must be between 2 to 30 chars';
    }

    if (Validator.isEmpty(data.lastName) ) {
        error = 'Last name field is required';
    }

    if (Validator.isEmpty(data.firstName) ) {
        error = 'First name field is required';
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

    if(!Validator.isLength(data.passwordConfirm, {min: 6, max: 30})) {
        error = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.passwordConfirm)) {
        error = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.passwordConfirm)) {
        error = 'Password is required';
    }

    return {
        error,
        isValid: isEmpty(error)
    }

}