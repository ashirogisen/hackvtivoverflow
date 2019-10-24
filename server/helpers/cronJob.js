const cron = require('node-cron');
const Question = require('../models/question')
const sendMessage = require('../helpers/sendMessage.js');

//Delete all questions that has 5 or less view-counts every week

cron.schedule('* * * * 1 *', function() {
    let deletedData = [];
    let usersEmail = [];
    Question.find().populate('user')
        .then(questions => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].views <= 5) {
                    deletedData.push(questions[i]._id);
                    usersEmail.push(questions[i].user.email);
                }
            }

            console.log('deletedData:', deletedData);
            console.log('usersEmail:', usersEmail);

            Question.deleteMany({_id: {
                $in: deletedData
            }})
                .then(result => {
                    console.log('Deleted data:', result);
                    sendMessage(usersEmail);
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = cron;