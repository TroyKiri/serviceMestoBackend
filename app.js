const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const invalidRout = require('./routes/invalid');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', routerUser);
app.use((req, res, next) => {
  req.user = {
    _id: '5f0e06029abf7e0dd8704070',
  };

  next();
});
app.use('/cards', routerCard);
app.use('/', invalidRout);

app.listen(PORT, () => console.log(`Порт запущенного сервера: ${PORT}`));
