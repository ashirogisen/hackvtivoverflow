const router = require('express').Router()
const questionController = require('../controllers/questionController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, questionController.create)
router.get('/top', questionController.displayTop)
router.get('/', isLogin, questionController.displayByUserId)
router.delete('/:id', isLogin, questionController.delete)
router.get('/:id', isLogin, questionController.displayDetails)
router.put('/:id', isLogin, questionController.update)
// router.get('/search/:keyword', questionController.searchQuestion)
router.patch('/upvote/:id', isLogin, questionController.upvote);
router.patch('/downvote/:id', isLogin, questionController.downvote)
router.patch('/views/:id', questionController.updateViews)

module.exports = router