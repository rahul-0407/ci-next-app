import {WebSocketServer} from "ws";
import {client} from "@repo/db/client"
import { config } from 'dotenv';

// Load .env file
config();

const server = new WebSocketServer({
    port: 3001
});

server.on("connection", async(socket) => {
    try {
        const res = await client.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        });
        console.log("Created user:", res);
        socket.send("Hi there you are connected to the server");
    } catch (error) {
        console.error("Error creating user:", error);
        socket.send("Error: Could not create user");
    }
});

console.log("🚀 WebSocket server running on port 3001");