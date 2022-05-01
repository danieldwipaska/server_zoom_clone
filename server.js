const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();
const app = express();

//MIDDLEWARES
app.use(express.json());
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

//LISTEN
app.listen(3000, () => {
  console.log('listening at port 3000!');
});
