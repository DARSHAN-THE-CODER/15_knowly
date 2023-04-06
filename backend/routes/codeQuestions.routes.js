const express = require('express')

const router = express.Router()

const {getQuestionsUsingClassId, createCodeQuestion, getCodeQuestions, getAllQuestions} = require("../controllers/codeQuestions")

router.post("/", createCodeQuestion)

router.get("/", getAllQuestions)

router.get("/class/:classId", getQuestionsUsingClassId)

router.get("/:classCode", getCodeQuestions)

module.exports = router