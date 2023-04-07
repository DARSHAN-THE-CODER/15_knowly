const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
    try {
        const quizData = req.body.data;

        // let promises = []

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

module.exports = {
    createQuiz
}