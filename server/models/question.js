const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
})

let Question = mongoose.model('Question', questionSchema)
module.exports = Question