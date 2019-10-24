const bcryptjs = require('bcryptjs')

function hashPassword(password) {
    const saltRounds = 10
    return bcryptjs.hashSync(password, saltRounds)
}

module.exports = hashPassword