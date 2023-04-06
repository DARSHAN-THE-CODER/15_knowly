const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createClass = async (req, res) => {
    try {
        const data = req.body.data;

        const newClass = await prisma.class.create({
            data: {
                name: data.name,
                classCode: data.classCode,
                teacher: {
                    connect: {
                        id: data.teacherId
                    }
                }
            }
        });

        res.status(200).json({ newClass });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllClasses = async (req, res) => {
    try {
        const classes = await prisma.class.findMany({
            include: {
                students: true,
                teacher: true,
            }
        });

        res.status(200).json({ classes });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getClassesUsingStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const classes = await prisma.classes.findMany({
            where: {
                students: {
                    some: {
                        id: studentId
                    }
                }
            }
        });

        res.status(200).json({ classes });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getClassesUsingTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const classes = await prisma.class.findMany({
            where: {
                teacher: {
                    id: parseInt(teacherId)
                }
            }
        });

        res.status(200).json({ classes });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getClassesUsingClassCode = async (req, res) => {
    try {
        const { classCode } = req.params;

        const classes = await prisma.classes.findMany({
            where: {
                classCode: classCode
            }
        });

        res.status(200).json({ classes });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createClass,
    getAllClasses,
    getClassesUsingStudentId,
    getClassesUsingClassCode,
    getClassesUsingTeacherId,
}