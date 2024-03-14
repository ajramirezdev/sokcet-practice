const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`user with id ${socket.id} just connected`);

    socket.on("wager", (wager) => {
        console.log(wager);
        io.emit("addWager", wager);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
