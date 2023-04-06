const express = require('express')

const router = express.Router()

const classRoutes = require('./classes.routes')

const codeQuestionRoutes = require('./codeQuestions.routes')

const teacherRoutes = require('./teacher.routes')

const studentRoutes = require('./students.route')

router.use('/classes', classRoutes)

router.use('/codequestions', codeQuestionRoutes)

router.use('/teacher', teacherRoutes)

router.use('/student', studentRoutes)

module.exports = router