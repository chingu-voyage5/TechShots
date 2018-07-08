const { User } = require('./../db/models/User');

const authenticate = (req, res, next) => {
    const token = req.header('x-token');
    User.checkByToken(token)
        .then((user) => {
            if (!user) return Promise.reject();
            req.user = user;
            req.token = token;
            next();
        })
        .catch((e) => res.redirect('/'));
}

module.exports = { authenticate };