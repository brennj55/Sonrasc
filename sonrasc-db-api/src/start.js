var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7004, () => {
  console.log("Listening on port 7004 for data..!");
});

io.on('connection', (socket) => {
  console.log("User connected on DB API! <3");
  
  socket.on('form-submit', formData => {
    console.log(formData);
  });
});
