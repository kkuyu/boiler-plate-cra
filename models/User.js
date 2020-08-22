const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};