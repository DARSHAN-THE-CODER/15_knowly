const express = require('express')

const router = express.Router()

const {createTeacher, getAllTeachers} = require("../controllers/teacher.controller.js")

router.post('/', createTeacher)

router.get('/', getAllTeachers)

module.exports = router