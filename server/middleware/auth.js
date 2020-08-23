const {
    User
} = require('../models/User')

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    User.findByToken(token, (error, user) => {
        if (error) return callbackFn(error);

        if (!user)
            return res.json({
                isAuth: false,
                error: true
            })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {
    auth
};