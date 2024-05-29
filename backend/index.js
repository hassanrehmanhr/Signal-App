import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const PORT = 5000;
const FRONTEND_URL = "https://signal-app-three.vercel.app";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: FRONTEND_URL,
        methods: ["GET", "POST"]
    },
});

app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    })
);

app.use(express.json());

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("message", ({ message }) => {
        console.log({ message });
        const newMessage = `${message}`;
        io.emit("receive-message", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
