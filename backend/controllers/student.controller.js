const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createStudent = async (req, res) => {
    try {
        const data = req.body.data;

        const newStudent = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        res.status(200).json({ newStudent });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await prisma.user.findMany({
            include: {
              classes: true
            }
        });

        res.status(200).json({ students });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const studentLogin = async (req, res) => {
    try {
        const data = req.body.data;

        const studentdata = await prisma.user.findUnique({
            where: {
                email: data.email,
                password: data.password
            }
        });

        if(!studentdata){
            res.status(404).json({ message: "Student Not Found" })
        }else {
            if(studentdata.password === data.password){
                res.status(200).json({ studentdata });
            } else {
                return res.status(401).json({ message: "Invalid Credentials" })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    studentLogin
}