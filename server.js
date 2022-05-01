const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.get('/', (req, res) => {
  res.json({
    msg: 'This is your first response!',
  });
});

//LISTEN
app.listen(3000, () => {
  console.log('listening at port 3000!');
});
