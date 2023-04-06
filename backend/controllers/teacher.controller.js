
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createTeacher = async (req, res) => {
    try {
        const data = req.body.data;
        console.log(data)
        const teacher = await prisma.teacher.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });

        res.status(200).json({ teacher });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const teacherLogin = async (req, res) => {
    try {
        const data = req.body.data;
        const teacherData = await prisma.teacher.findUnique({
            where: {
                email: data.email
            }
        });
        if(!teacherData){
            return res.status(401).json({ message: "Teacher not found" })
        } else {
            if(teacherData.password === data.password){
                return res.status(200).json({ teacherData });
            } else{
                return res.status(401).json({ message: "Invalid Credentials" })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await prisma.teacher.findMany();

        res.status(200).json({ teachers });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createTeacher,
    getAllTeachers,
    teacherLogin
}