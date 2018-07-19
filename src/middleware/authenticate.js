const { User } = require('./../db/models/User');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    User.checkByToken(token)
        .then((user) => {
            if (!user) return Promise.reject();
            req.user = user;
            req.token = token;
            next();
        })
        .catch((e) => res.json({ success: false }));
}

module.exports = { authenticate };