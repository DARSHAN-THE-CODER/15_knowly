const express = require('express')

const router = express.Router()

const classRoutes = require('./classes.routes')

const codeQuestionRoutes = require('./codeQuestions.routes')

const teacherRoutes = require('./teacher.routes')

router.use('/classes', classRoutes)

router.use('/codequestions', codeQuestionRoutes)

router.use('/teacher', teacherRoutes)

module.exports = router