const express = require('express')

const router = express.Router()

const {createCodeQuestion, getCodeQuestions, getAllQuestions} = require("../controllers/codeQuestions")

router.post("/", createCodeQuestion)

router.get("/", getAllQuestions)

router.get("/:classCode", getCodeQuestions)

module.exports = router