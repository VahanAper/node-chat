const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });

  socket.emit('newMessage', {
    from: 'vahan@test.com',
    text: 'How are you?',
    createdAt: 123123,
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
