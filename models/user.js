const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }
    ]
});

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next()
    }
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])

}

userSchema.methods.removeToken = function(token){
    let user = this;

    return user.update({
        $pull:{
            tokens:{
                token
            }
        }
    });
}

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'someSecret');
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject();
        })
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    })
}

userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth'
    let token = jwt.sign({ _id: user._id.toHexString(), access }, 'someSecret');
    user.tokens.push({ token, access })

    return user.save().then(() => {
        return token;
    })
}

const User = mongoose.model('user', userSchema);



module.exports = User;