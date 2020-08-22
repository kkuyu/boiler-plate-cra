const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (error, salt) {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return next(error);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callbackFn) {
    var user = this;

    bcrypt.compare(plainPassword, user.password, function (error, isMatch) {
        if (error) return callbackFn(error);

        callbackFn(null, isMatch);
    })
}

userSchema.methods.generateToken = function (callbackFn) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), "secretToken");

    user.token = token;
    user.save(function (error, user) {
        if (error) return callbackFn(error);

        callbackFn(null, user);
    });
}

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};