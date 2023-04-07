const express = require('express')

const router = express.Router()

const { createQuiz } = require('../controllers/quiz.controller.js')

router.post('/', createQuiz)

module.exports = router