const express = require('express')

const router = express.Router()

const {joinClassByStudent,createClass,getAllClasses, getClassesUsingClassCode, getClassesUsingStudentId, getClassesUsingTeacherId, addContent} = require("../controllers/classes.controller.js")

router.post('/', createClass)

router.get('/', getAllClasses)

router.get('/student/:studentId', getClassesUsingStudentId)

router.get('/teacher/:teacherId', getClassesUsingTeacherId)

router.get('/classCode/:classCode', getClassesUsingClassCode)

router.post('/studentjoin/:classCode/:studentId', joinClassByStudent )

router.post("/addcontent/:classCode", addContent)

module.exports = router