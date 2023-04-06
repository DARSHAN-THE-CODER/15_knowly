
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createCodeQuestion = async (req, res) => {
    try {
        const data = req.body.data;
        const codeQuestion = await prisma.codeQuestions.create({
            data: {
                title: data.title,
                answer: data.answer,
                isCode: data.isCode,
                question: data.question,
                Class: {
                    connect: {
                        id: parseInt(data.classId)
                    }
                }
            }
        });

        console.log(codeQuestion)
        // insert test cases to TestCases table
        let promises = []
        for (const testCase of data.testCases) {
            promises.push(prisma.testCases.create({
                data: {
                    input: testCase.input,
                    output: testCase.output,
                    CodeQuestions: {
                        connect: {
                            id: codeQuestion.id
                        }
                    }
                }
            }))
        }
        const testCasesData = await prisma.$transaction([...promises])
        // const testCases = await prisma.testCases.createMany({
        //     data: data.testCases.map((testCase) => {
        //         return {
        //             input: testCase.input,
        //             output: testCase.output,
        //             codeQuestion: {
        //                 connect: {
        //                     id: codeQuestion.id
        //                 }
        //             }
        //         }
        //     }
        //     )
        // });

        res.status(200).json({ codeQuestion, testCasesData });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const getCodeQuestions = async (req, res) => {
    try {
        const { classCode } = req.params;

        const codeQuestions = await prisma.codeQuestions.findMany({
            where: {
                class: {
                    classCode: classCode
                }
            },
            include: {
                testCases: true
            }
        });

        res.status(200).json({ codeQuestions });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const allQuestions = await prisma.codeQuestions.findMany({
            include: {
                testCases: true
            }
        });

        res.status(200).json({ allQuestions });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    createCodeQuestion,
    getCodeQuestions,
    getAllQuestions
}