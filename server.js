const express = require('express');
const path = require('path');
const opn = require('opn');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Example app listening on port 3000');
    // opn('http://localhost:3000');
  }
})
