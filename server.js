const http = require('http');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');

const socketio = require('socket.io');
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const io = socketio(server);

dotenv.config();

//MIDDLEWARES
app.use('/peerjs', peerServer);
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
  });
});

//LISTEN
server.listen(3030, () => {
  console.log('listening at port 3030!');
});
