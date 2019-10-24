const bcryptjs = require('bcryptjs')

function verifyPassword(password, hashedPassword) {
    const passwordIsTrue = bcryptjs.compareSync(password, hashedPassword)
    return passwordIsTrue
}

module.exports = verifyPassword