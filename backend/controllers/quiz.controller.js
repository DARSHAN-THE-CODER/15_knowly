const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
    try {
        const quizData = req.body.data;

        // let promises = []
        const leaderboard = await prisma.response.deleteMany({
            where: {
                classCode: quizData.classCode
            }
        })

        // const deleteQuestions = await prisma.quiz.deleteMany({
        //     where: {
        //         classCode: quizData.classCode
        //     },
        //     include: {
        //         questions: {
        //             include: {
        //                Option: true
        //             }
        //         }}
        // })

        const quiz = await prisma.quiz.create({
            data: {
                title: quizData.title,
                class: {
                    connect: { classCode: quizData.classCode }
                },
                questions: {
                    create: quizData.questions.map(question => ({
                        question: question.question,
                        options: {
                            create: question.options.map(option => ({ text: option }))
                        },
                        answer: question.answer
                    }))
                }
            },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        })

        res.status(200).json({ quiz })

        // {
        //     title: "Aditya rocksss",
        //     classCode: "ABC123",
        //     questions: [
        //             {
        //                 question: "What is the capital of India?",
        //                 options: [ 'Delhi', 'Mumbai', 'Kolkata', 'Chennai' ],
        //                 answer : 'Delhi'
        //             } ,
        //             {
        //                 question: "What is the capital of India?",
        //                 options: [ 'Delhi', 'Mumbai', 'Kolkata', 'Chennai' ],
        //                 answer : 'Delhi'
        //             }
        //         ]
        // }        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getQuizDetails = async (req, res) => {
    try {
        const { classCode } = req.params;
        console.log(classCode)
        const quiz = await prisma.quiz.findMany({
            where: {
                class: {
                    classCode: classCode
                }
            },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        })

        res.status(200).json({ quiz })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getLeaderBoard = async (req, res) => {
    try {
        const { classCode } = req.params;

        const leaderboard = await prisma.class.findUnique({
            where: {
                classCode: classCode
            },
            include: {
                Response: true
            }
        })

        res.status(200).json({ "leaderboard": leaderboard })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const deleteLeaderBoardResponses = async (req, res) => {
    try {
        const { classCode } = req.params;

        // delete response array completely

        const leaderboard = await prisma.response.deleteMany({
            where: {
                classCode: classCode
            }
        })

        res.status(200).json({ "leaderboard": leaderboard })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}




module.exports = {
    createQuiz,
    getQuizDetails,
    getLeaderBoard,
    deleteLeaderBoardResponses
}