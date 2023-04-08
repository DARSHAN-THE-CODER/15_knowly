const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

require('./cron.js')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8001;
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// CORS
app.use(cors());

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const defaultRouter = require('./routes/index.js')

app.get("/", (req, res) => {
    res.json({ message: "Server running" });
});

app.use('/api/v1', defaultRouter)

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

var io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
});

let currentQuestionIndex = -1;

io.on('connection', (socket) => {
    // console.log('New user connected')

    let length = 0;

    

    socket.on('startQuiz', (data) => {
        // Emit the startQuiz event to all the students in the classCode room
        io.to(data.classCode).emit('startQuiz', data.classCode);
        // console.log(data.length)
        length = data.length;
        currentQuestionTimeoutId = setTimeout(sendNextQuestion, 10000);
    });

    socket.on('clicked',async (data) => {
        console.log(data)
        await prisma.response.update({
            where: {
                id: data.id
            },
            data: {
                score: data.score,
                correct: data.correct
            }
        }).then((res) => {
            console.log("updated successfully")
            // console.log(`User joined with name: ${data.name} and classCode: ${data.classCode}`);
            // socket.emit('joined', data.classCode);
            // socket.join(data.classCode);
        }).catch((err) => {
            console.log(err)   
        })

    })

    socket.on('joinQuiz', async (data) => {
        // console.log(`User joined with name: ${data.name} and classCode: ${data.classCode}`);

        // socket.join(data.classCode);
        await prisma.response.create({
            data: {
                studentName: data.name,
                classCode: data.classCode,
                score: 0
            }
        }).then((res) => {
            console.log(`User joined with name: ${data.name} and classCode: ${data.classCode}`);
            // socket.emit('joined', data.classCode);
            socket.join(data.classCode);
            socket.emit('joined', res.id);
        }).catch((err) => {
            console.log(err)   
        })
    });

    function sendNextQuestion() {
        currentQuestionIndex++;
        const classCode = socket.handshake.query.classCode;
        // console.log(currentQuestionIndex)
        if (currentQuestionIndex < length) {
            // io.to(Object.keys(io.sockets.adapter.rooms)[0]).emit('nextQuestion', currentQuestionIndex);
            io.to(classCode).emit('nextQuestion', currentQuestionIndex);
            currentQuestionTimeoutId = setTimeout(sendNextQuestion, 10000);
            console.log(currentQuestionIndex)
        } else {
            io.to(classCode).emit('quizEnded', classCode);
            console.log('Quiz Ended')
            currentQuestionIndex = -1;
            clearTimeout(currentQuestionTimeoutId);
        }
    }


    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})
