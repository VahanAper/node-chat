const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.emit('newMessage', generateMessage('Admin', 'Welcome!!!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined.'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
