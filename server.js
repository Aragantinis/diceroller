const express = require('express');
const path = require('path');
const opn = require('opn');
const uuidv4 = require('uuid/v4');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

var users = [];
var messages = [];

var numberOfGuests = 0;

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

io.on('connection', function (socket) {
  newUser = {
    id: uuidv4(),
    userName: 'guest' + ++numberOfGuests
  }
  users.push(newUser)
  console.log(newUser)
  socket.emit('initialState', { user: newUser, users: users, messages: messages });
  socket.on("newMessage", (message) => {
    message.id = uuidv4();
    messages.push(message);
    console.log(message)
    io.sockets.emit('newMessage', message)
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(3000, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Example app listening on port 3000');
    // opn('http://localhost:3000');
  }
})
