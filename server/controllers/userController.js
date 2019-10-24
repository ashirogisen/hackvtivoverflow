const User = require('../models/user')
const generateToken = require('../helpers/generateToken')
const verifyPassword = require('../helpers/verifyPassword')

class userController {
    static register (req, res, next) {
        const createdData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(createdData)
            .then(created_data => {
                const data = {
                    id: created_data._id,
                    name: created_data.name,
                    email: created_data.email,
                    password: created_data.password,
                    avatar: created_data.avatar
                }
                const token = generateToken(data)
                res.status(201).json({token, data})
            })
            .catch(next)
    }

    static login (req, res, next) {
        const email = {
            email: req.body.email
        }

        User.findOne(email)
            .then(user_data => {
                const paswordIsTrue = verifyPassword(req.body.password, user_data.password)
                if (paswordIsTrue) {
                    const data = {
                        id: user_data._id,
                        name: user_data.name,
                        email: user_data.email,
                        password: user_data.password,
                        avatar: user_data.avatar
                    }
                    const token = generateToken(data)
                    res.status(200).json({token, data})
                } else {
                    throw {
                        message: 'Wrong email or password',
                        statusCode: 401
                    }
                }
            })
            .catch(next)
    }
}

module.exports = userController