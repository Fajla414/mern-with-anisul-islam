const { Schema, Model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagaePath } = require('../secret');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength: [3, "The length of User name can be miniimum 31 characters"],
        maxLength: [31, "The length of User name can be maximum 31 characters"],

    },
    email: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Please enter a valid email address"
        }

    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: [6, "The length of User password can be miniimum 6 characters"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        default: defaultImagaePath
    },
    address: {
        type: String,
        required: [true, "User address is required"],
    },
    phone: {
        type: String,
        required: [true, "User phone is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })



const User = Model("Users", userSchema);
module.exports = User;