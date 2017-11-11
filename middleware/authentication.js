const User = require('../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth')
    User.findByToken(token).then((user) => {
        if (user) {
            req.user = user;
            req.token = token;
        } else {
            Promise.reject();
        }
        next()
    }).catch((error) => {
        res.status(401).send('NOTIN');
        next();
    })
}

module.exports = authenticate;