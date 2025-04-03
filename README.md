Real-time Chat Application with Socket.io:-

Description:-
This is a real-time chat application built using Node.js, Express.js, MongoDB, and Socket.io. It allows users to send and receive messages in real-time, see who is typing, and track the number of connected users.

Features:-
Real-time messaging using WebSockets.
User join and leave notifications.
Typing indicators for active users.
Message persistence using MongoDB.
User count and connected user list updates dynamically.

Technologies Used:-
Node.js
Express.js
Socket.io
MongoDB (Mongoose ODM)
HTML, CSS, JavaScript (Frontend UI)

Installation:-
Prerequisites:-
Make sure you have Node.js and MongoDB installed.

Steps:-

Clone the repository:
git clone https://github.com/your-repo-url.git
cd your-repo-folder
Install dependencies:
npm install
Start the MongoDB server:
mongod

Start the chat server:
npm start
Open the application in your browser:
http://localhost:3000/public/client.html

Project Structure:-

project-folder/
│── public/
│   ├── client.html
│   ├── style.css
│── config.js
│── chat.schema.js
│── server.js
│── package.json
│── README.md

Future Enhancements:-
User authentication (login/signup system).
Private messaging between users.
Message reactions and emoji support.
File and image sharing.
