const express = require('express')

const router = express.Router()

const {createClass,getAllClasses, getClassesUsingClassCode, getClassesUsingStudentId, getClassesUsingTeacherId} = require("../controllers/classes.controller.js")

router.post('/', createClass)

router.get('/', getAllClasses)

router.get('/student/:studentId', getClassesUsingStudentId)

router.get('/teacher/:teacherId', getClassesUsingTeacherId)

router.get('/classCode/:classCode', getClassesUsingClassCode)

module.exports = router