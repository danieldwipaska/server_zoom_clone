const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//MIDDLEWARES
app.use(express.json());
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
  res.render('room');
});

//LISTEN
app.listen(3000, () => {
  console.log('listening at port 3000!');
});
