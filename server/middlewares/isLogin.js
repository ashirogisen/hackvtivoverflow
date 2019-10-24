const verifyToken = require('../helpers/verifyToken')

function isLogin(req, res, next) {
    const token = req.headers.token

    try {
        const decodedToken = verifyToken(token)
        req.LoggedUser = decodedToken
        next()
    }
    catch(err) {
        next(err)
    }
}

module.exports = isLogin