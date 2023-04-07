const express = require('express')

const router = express.Router()

const { deleteLeaderBoardResponses, createQuiz, getQuizDetails, getLeaderBoard } = require('../controllers/quiz.controller.js')

router.post('/', createQuiz)

router.get('/leaderboard/:classCode', getLeaderBoard)

router.get('/:classCode', getQuizDetails)

router.delete('/leaderboard/:classCode', deleteLeaderBoardResponses)

module.exports = router