const mongoose = require('mongoose');
const { v4:uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    fullName: {
        type: String
    },
    // lastName: {
    //     type: String
    // },
    // middleName: {
    //     type: String
    // },
    e_password: {
        type: String
    },
    vehicleType: {
        type: String
    },
    salt: {
        type: String,
        default: uuidv4()
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    },
    isNumberVerified: {
        type: Boolean,
        default: true
    },
    contribution: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User' , UserSchema);
module.exports = { User };