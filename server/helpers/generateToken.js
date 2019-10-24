const jwt = require('jsonwebtoken')

function generateToken(data) {
    const token = jwt.sign(data, process.env.SECRET)
    return token
}

module.exports = generateToken