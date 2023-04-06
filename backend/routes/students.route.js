const express = require('express')

const router = express.Router()

const { createStudent, getAllStudents, studentLogin } = require("../controllers/student.controller.js")

router.post('/', createStudent)

router.get('/', getAllStudents)

router.post('/login', studentLogin)

module.exports = router