const User = require('../models/user');
const authenticate = require('../middleware/authentication')
const { login, signup } = require('../helpers/users')

module.exports = (app) => {
    app.post('/signup', signup)

    app.post('/login', login);

    app.get('/me', authenticate, (req, res) => {
        res.send(req.user)
    })

    app.delete('/logout', authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
            res.send('YOU ARE LOGGED OUT')
        })
    })
}