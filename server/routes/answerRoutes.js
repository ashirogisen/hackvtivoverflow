const router = require('express').Router()
const answerController = require('../controllers/answerController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, answerController.create)
router.get('/:id', answerController.displayByQuestionId)
router.get('/', isLogin, answerController.displayByUserId)
router.delete('/:id', isLogin, answerController.delete)
router.patch('/:id', isLogin, answerController.update)
router.patch('/upvote/:question_id', isLogin, answerController.upvote);
router.patch('/downvote/:question_id', isLogin, answerController.downvote);

module.exports = router