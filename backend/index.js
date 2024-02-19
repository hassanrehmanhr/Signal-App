import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 5000;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("message", ({ room, message }) => {
        console.log({ room, message });
        socket.to(room).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
