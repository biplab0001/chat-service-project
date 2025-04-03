import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import {connect} from './config.js';
import {ChatModel} from './chat.schema.js'

const app = express();

const server = http.createServer(app);

const typingUsers = new Set();
const connectedUsers = {};

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=>{
    console.log("Connection is established");

    socket.on("join", (data)=>{
        socket.username = data;
        connectedUsers[socket.id] = socket.username;
        io.emit('user_count', Object.keys(connectedUsers).length);
        io.emit('user_list', Object.values(connectedUsers));
        ChatModel.find().limit(50).then(message => {
            socket.emit("load_message", message)
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('new_message', (message)=>{
        let userMessage = {
            username: socket.username,
            message: message
        }
        const newChat = new ChatModel({
            name: socket.username,
            message: message,
            timestamp: new Date()
        })
        newChat.save()

        // broadcast this message to all the clients.
        socket.broadcast.emit('broadcast_message', userMessage);
    })

    socket.on('typing', () => {
        typingUsers.add(socket.username);
        io.emit('typing_status', Array.from(typingUsers));
    });

    socket.on('stop_typing', () => {
        typingUsers.delete(socket.username);
        io.emit('typing_status', Array.from(typingUsers));
    });

    socket.on('disconnect', ()=>{
        delete connectedUsers[socket.id];
        io.emit('user_count', Object.keys(connectedUsers).length);
        io.emit('user_list', Object.values(connectedUsers));
        console.log("Connection is disconnected");
    })
})

server.listen(3000, ()=>{
    console.log("Server is connected at port 3000")
    connect();
})