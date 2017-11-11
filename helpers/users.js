const User = require('../models/user');
const bcrypt = require('bcrypt')

module.exports = {
    login: (req, res) => {
        let { email, password } = req.body;
        User.findOne({ email }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, isPassword) {
                    (isPassword) ? res.send(user) : res.send('WRONG PASSWORD')
                });
            } else {
                res.send('USER NOT FOUND')
            }

        }).catch((error) => {
            res.send(error)
        })
    },
    signup: (req, res) => {
        let { email, password } = req.body;
        User.findOne({ email }).then((user) => {
            (user) ? res.status(400).send('EMAIL ALREADY IN USE') :
                User.create({ email, password }).then((newUser) => {
                    newUser.generateAuthToken().then((token) => {
                        res.header('x-auth', token).send(newUser)
                    })
                })
        }).catch((error) => {
            res.send(error)
        })
    }
}