const express = require('express')

const router = express.Router()

const {teacherLogin, createTeacher, getAllTeachers} = require("../controllers/teacher.controller.js")

router.post('/', createTeacher)

router.get('/', getAllTeachers)

router.post('/login', teacherLogin)

module.exports = router