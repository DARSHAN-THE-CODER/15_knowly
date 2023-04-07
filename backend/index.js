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

const defaultRouter = require('./routes/index.js')

app.get("/", (req, res) => {
    res.json({ message: "Server running" });
});

app.use('/api/v1',defaultRouter)

const server = app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

var io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*"
    }
});

io.on('connection',(socket) => {
    console.log('New user connected')
    
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})
  