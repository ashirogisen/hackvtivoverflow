const jwt = require('jsonwebtoken')
const Question = require('../models/question')

function isAuthorized(req, res, next) {
    const id = {
        _id: req.params.id
    }

    Question.findOne(id)
        .then(question => {
            if(question.user == req.LoggedUser.id) {
                next()
            } else{
                throw {
                    status: 401,
                    msg: "Not Authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = isAuthorized