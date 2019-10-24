const jwt = require('jsonwebtoken')

function verifyToken(token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    return decodedToken
} 

module.exports = verifyToken