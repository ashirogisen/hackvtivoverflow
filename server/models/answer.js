const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
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
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
}, {
    timestamps: true
});

let Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer